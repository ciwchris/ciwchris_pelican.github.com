Title: Mocking with Moq
Date: 2013-03-04 21:29
Category: 
Tags: c#, mocking, tests
Slug: mocking-with-moq
Author: Chris
Summary: 

Notes for the pluralsight course [Mocking With Moq](http://pluralsight.com/training/Courses/TableOfContents/mocking-with-moq).

### Unit tests should be ###

- **Atomic:** one small thing
- **Deterministic:** pass or fail
- **Repeatable:** shouldn't start failing if no code has changed
- **Isolated and order independent:** nothing should affect it
- **Fast:** milliseconds
- **Easy to setup:** shouldn't take a lot of coding

### Samples ###

{% inline_code lang:csharp Verify a method is called
mockRepository.Setup(x => x.Save(It.IsAny<Customer>()));

mockRepository.VerifyAll();
%}

{% inline_code lang:csharp Verify a method was called n times
mockCustomerRepository.Verify(x=>x.Save(It.IsAny<Customer>()),
	Times.Exactly(2));
%}

{% inline_code lang:csharp Mock return a value
mockAddressBuilder
	.Setup(x => x.From(It.IsAny<CustomerToCreateDto>()))
	.Returns(() => new Address());

mockCustomerRepository.Verify(y=>y.Save(It.IsAny<Customer>()));
%}

{% inline_code lang:csharp Using an out parameter
mockMailingAddressFactory
	.Setup(x => x.TryParse(It.IsAny<string>(), out mailingAddress))
	.Returns(true);

mockCustomerRepository.Verify(x=>x.Save(It.IsAny<Customer>()));
%}

{% inline_code lang:csharp Change the return value after each call to the mocked member
mockIdFactory.Setup(x => x.Create())
	.Returns(() => i)
	.Callback(() => i++);

mockIdFactory.Verify(x => x.Create(), Times.AtLeastOnce());
%}

{% inline_code lang:csharp Verify the arguments passed to the mocked method are as expected
mockFullNameBuilder.Setup(
	x => x.From(It.IsAny<string>(), It.IsAny<string>()));

mockFullNameBuilder.Verify(x=>x.From(
	It.Is<string>(
		fn=>fn.Equals(customerToCreateDto.FirstName,
			StringComparison.InvariantCultureIgnoreCase)),
	It.Is<string>(
		fn=>fn.Equals(customerToCreateDto.LastName,
			StringComparison.InvariantCultureIgnoreCase))));
%}

{% inline_code lang:csharp Conditionally return a value, control code flow
mockCustomerStatusFactory.Setup(
	x => x.CreateFrom(
		It.Is<CustomerToCreateDto>(
			y => y.DesiredStatus == CustomerStatus.Platinum)))
	.Returns(CustomerStatus.Platinum);

mockCustomerRepository.Verify(
	x=>x.SaveSpecial(It.IsAny<Customer>()));
%}

{% inline_code lang:csharp Throw an exception
mockCustomerAddressFactory
	.Setup(x => x.From(It.IsAny<CustomerToCreateDto>()))
	.Throws<InvalidCustomerAddressException>();
%}

{% inline_code lang:csharp Verify a setter has been set
mockCustomerRepository.VerifySet(
	x=>x.LocalTimeZone = It.IsAny<string>());
%}

{% inline_code lang:csharp Verify a getter has been called
mockApplicationSettings.Setup(x => x.WorkstationId).Returns(123);

mockApplicationSettings.VerifyGet(x=>x.WorkstationId);
%}
For nested objects you don't have to mock each object; Moq will automatically return a mocked object if it can.

{% inline_code lang:csharp Recursive/nested properties, Moq realizes each is mockable and so will return a mock for each
mockApplicationSettings.Setup(
	x => x.SystemConfiguration.AuditingInformation.WorkstationId)
	.Returns(123);

mockApplicationSettings.VerifyGet(
	x => x.SystemConfiguration.AuditingInformation.WorkstationId);
%}

{% inline_code lang:csharp Stub a property
mockApplicationSettings.SetupProperty(x => x.WorkstationId, 1234);

mockApplicationSettings.VerifyGet(x=>x.WorkstationId);
%}

{% inline_code lang:csharp Stub all properties
mockApplicationSettings.SetupAllProperties();
mockApplicationSettings.Object.WorkstationId = 2345;

mockApplicationSettings.VerifyGet(x=>x.WorkstationId);
%}

{% inline_code lang:csharp Event
mockCustomerRepository.Raise(
	x=>x.NotifySalesTeam += null,
	new NotifySalesTeamEventArgs("jim"));

mockMailingRepository.Verify(
	x => x.NewCustomerMessage(It.IsAny<string>()));
%}

{% inline_code lang:csharp Custom event
mockCustomerRepository.Raise(
	x=>x.NotifySalesTeam += null,
	"jim", false);

mockMailingRepository.Verify(
	x => x.NewCustomerMessage(It.IsAny<string>()));
%}

Two types of mocks:

1. **Loose:** if the object doesn't have any expectations set it will return the default value for the object. It will not throw an exception when verify is called. This is the default behavior for Moq
2. **Strict:** exception will be thrown if the object hasn't been explicitly setup.

{% inline_code lang:csharp Strict mock behavior
var mockCustomerRepository = 
	new Mock<ICustomerRepository>(MockBehavior.Strict);
mockCustomerRepository.Setup(x => x.Save(It.IsAny<Customer>()));

mockCustomerRepository.Verify();
%}

**Partial mock:** allows invocation of a base class implementation

{% inline_code lang:csharp Mock the SUT when working with a base class
mockNameFormatter.Object.From(new Customer("Bob", "SAPBuilder"));

mockNameFormatter.Verify(
	x=>x.ParseBadWordsFrom(It.IsAny<string>()),
	Times.Exactly(2));
%}

**Recursive:** Set the default value of a mock to return a mocked object, `DefaultValue = DefaultValue.Mock`, instead of the object's default value, this only works if  the object is mockable. Then use `Mock.Get()` to retrieve the actual mock which can then be used like any other mocked object

{% inline_code lang:csharp Recursive mock
var mockAddressFormatterFactory = 
	new Mock<IAddressFormatterFactory> 
		{DefaultValue = DefaultValue.Mock};
var addressFormatter = mockAddressFormatterFactory
	.Object.From(It.IsAny<string>());
var mock = Mock.Get(addressFormatter);

mock.Verify(x=>x.From(It.IsAny<CustomerToCreateDto>()));
%}
Use a mock factory when working with lots of dependencies. This centralizes the creation and verification of all mock objects.

{% inline_code lang:csharp Mock factory
var mockFactory = new MockRepository(MockBehavior.Loose) 
				{DefaultValue = DefaultValue.Mock};
var mockCustomerRepository = 
	mockFactory.Create<ICustomerRepository>();
var mockCustomerAddressFormatter = 
	mockFactory.Create<ICustomerAddressFormatter>();

mockFactory.Verify();
%}

When mocking protected members the member must be marked as virtual. You lose intellisense, method name must appear in a string. Must use `ItExpr` instead of `It`.

{% inline_code lang:csharp Protected members
mockCustomerNameFormatter.Protected()
	.Setup<string>("ParseBadWordsFrom", ItExpr.IsAny<string>())
	.Returns("asdf")
	.Verifiable();

mockCustomerNameFormatter.Verify();
%}
