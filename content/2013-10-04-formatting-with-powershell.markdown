Title: Formatting with PowerShell
Date: 2013-10-04 10:20
Category: 
Tags: powershell
Slug: formatting-with-powershell
Author: Chris
Summary: 

Notes from the Pluralsight course [Formatting With PowerShell](http://pluralsight.com/training/Courses/TableOfContents/formatwithpowershell)

### ToString


{% inline_code lang:PowerShell
$obj = New-Object System.Object
$obj.ToString()
%}



{% inline_code lang:PowerShell Using a format provider
$n = 4242.42
Get-Culture
$c = New-Object System.Globalization.CultureInfo de-DE
$n.ToString("c", $c)
%}

Numeric Format Strings

- c: Currency
- d: Decimal
- e: Exponential
- f: Fixed Point
- g: General (most compact form)
- n: Number
- p: Percent
- r: Round Trip (parsed back into the same numeric value
- x: Hexadecimal

Custom Numeric Placeholders

- 0: Zero
- \#: Digit
- .: Decimal
- ,: Group separator 
- %: Percentage
- ;: Section (different for positive, negative, zero)

{% inline_code lang:PowerShell Sections
$v1 = 1; $v2 = 2; $v3 = 0
$v1.ToString("#0.0#;(#0.0#);-\0-")
%}

{% inline_code lang:PowerShell NumberFormatInfo
$c = Get-Culture
$c | Get-Member -member proptery *format*
# DateTimeFormat
# NumberFormat

$c = New-Object System.Globalization.CultureInfo en-us
$nf = $c.NumberFormat
$nf.CurrencyDecimalDigits = 3
$nf.CurrencySymbol = "ZOG"
$nf.CurrencyDecimalSeparator="*"
$nf.CurrenceyGroupSeparator="/"
(42424242.4242).ToString("C2",$nf)
# ZOG 42/424/242*42
%}

{% inline_code lang:PowerShell TimeSpan
$ms = Get-Date "August 9, 1995"
$today = Get-Date
$time-span = New-TimeSpan -start $ms -end $today
%}

{% inline_code lang:PowerShell Enums
$enum = [System.Windows.Forms.Day]
"{0,9} {1,9} {2,4} {3,10}" -f "g", "f", "d", "x" #heading
Foreach ($e in [System.enum]::getvalues($enum)) {
	"{0,9} {1,9} {2,4} {3,10}" -f
	$e.ToString("g"),$e.ToString("f"),$e.ToString("d"), $e.ToString("x")
}
%}

### Composite Format String

{I, [W [: F]]}

- I: index into array
- W: width
	- Positive: right justified
	- Negative: left justified
- F: format string

{% inline_code lang:PowerShell
"{0} [{1,4}]=[{1,-4], and costs {2,-10:c}" -f 1, 2, 42.4242
"Today is {0}" -f (Get-Date).ToString("g")
"Today is {0:g}" -f Get-Date
$a = "{0,10} {1,10} {2,10:c}"
$a -f 1, 2, 42
%}

### Format-*

Formatting Rules

- VIEW loaded in Format.Ps1XML
- PropertySet in Type.Ps1XML and move to next rule
- Property count
	- Use properties in default PropertySet
	- All properties
- 5 or more: use Format-List
- < 5: use Format-Table

Table/List Formatting

- XML View defined in Format.Ps1XML
- XML Property Set in Type.Ps1XML
- Total properties

{% inline_code lang:PowerShell AutoSize
gps notepad | ft ProcessName, CPU -Autosize
%}

Truncation

- -Wrap: Prevent truncating
	- But will still stop at 4 lines
- $FormatEnumerationLimit: to increase the lines beyond the default of 4

Format-Wide: display single property using multiple columns

{% inline_code lang:PowerShell Format-Wide
gps | fw -property name -column 5
%}
{% inline_code lang:PowerShell Select-Object
gps | select-object -first 20 name, handles, cpu
gps | select-object *, @{Label='ComputerName';Expression={$_.Name}}
%}

### Hash Tables

{% inline_code lang:PowerShell Hash Table
$ht = @{name="Thomas Lee"; course='Formatting'}
$ht += @{vendor="Pluralsight"; modules=6}
%}

{% inline_code lang:PowerShell Hash Table Properties
$pn = @{Label="Process Name"; Expression={$_.name}; Alignment = "right" }
$cpu = @{Label="CPU Used"; Expression={$_.CPU}; Alignment = "right"; FormatString="N3"}
gps notepad | ft $pn,$cpu -auto
%}

### XML Format Files

- Stored in $Pshome folder
- Update-FormatData: load new format files using 

{% inline_code lang:PowerShell Display Format
cat '.\test.format.ps1xml'
<?xml version='1.0' encoding='utf-8' ?>
<Configuration>
	<DefaultSettings>
		<PropertyCountForTable>3</PropertyCountForTable>
		<WrapTables/>
	</DefaultSettings>
	<SelectionSets></SelectionSets>
	<Controls></Controls>
	<ViewDefinitions></ViewDefinitions>
</Configuration>
Update-FormatData -Prepend '.\test.form.ps1xml'
%}

{% inline_code lang:PowerShell Format Lists
cat '.\test.format.ps1xml'
<?xml version='1.0' encoding='utf-8' ?>
<Configuration><ViewDefinitions><View>
	<Name>CPUCost</Name>
	<ViewSelectedBy><TypeName>System.Diagnostics.Process</TypeName></ViewSelectedBy>
	<ListControl><ListEntries><ListEntry><ListItems>
		<ListItem>
			<Label>Process Name</Label>
			<PropertyName>ProcessName</PropertyName>
		</ListItem>
		<ListItem>
			<Label>CPU Cost</Label>
			<ScriptBlock>($_.cpu * 10) + 4</ScriptBlock>
			<FormatString>C3</FormatString>
			<ItemSelectionCondition>
				<ScriptBlock>$_.CPU _GE .5</ScriptBlock>
			</ItemSelectionCondition>
		</ListItem>
	</ListItems></ListEntry></ListEntries></ListControl>
</View></ViewDefinitons></Configuration>
Update-FormatData '.\test.form.ps1xml'
gps e* | fl -view CPUCost
%}


{% inline_code lang:PowerShell Format Tables
cat '.\test.format.ps1xml'
<?xml version='1.0' encoding='utf-8' ?>
<Configuration><ViewDefinitions><View>
	<Name>CPUCost</Name>
	<ViewSelectedBy><TypeName>System.Diagnostics.Process</TypeName></ViewSelectedBy>
	<TableControl><TableHeaders>
		<TableColumnHeader>
			<Label>Process Name</Label>
			<Width>15</Width>
			<Alignment>Right</Alignment>
		</TableColumnHeader>
		<TableColumnHeader>
			<Label>CPU Cost</Label>
			<Width>15</Width>
			<Alignment>Right</Alignment>
		</TableColumnHeader>
		<TableRowEntries>
			<TableRowEntry><TableColumnItems>
				<TableColumnItem>
					<PropertyName>Name</PropertyName>
					<Alignment>Left</Alignment>
				</TableColumnItem>
				<TableColumnItem>
					<ScriptBlock>($_.cpu * 10) + 4</ScriptBlock>
					<Alignment>Right</Alignment>
					<FormatString>N2</FormatString>
				</TableColumnItem>
			</TableColumnItems></TableRowEntry>
		</TableRowEntries>
</View></ViewDefinitons></Configuration>
Update-FormatData '.\test.form.ps1xml'
gps e* | ft -view CPUCost
%}

### Output

- Out-String: sends output as a series of strings
- Out-File: file
- Out-Printer: Out-Printer snagit
- Out-GridView: WPF grid
	- PowerShell v3 has -PassThru
- Out-Null: supresses
- Out-Default: default formatter
- Out-Host: to the command line
	- Has -Paging

{% inline_code lang:PowerShell View all properties
$s = Get-Service | ft -property * -auto | Out-String -width 700 | Out-File test.txt
%}

Constrained Language in XML: used by PowerShell remoting
- Import-CLiXML
- Export-CLiXML
- ConvertTo-XML

{% inline_code lang:PowerShell XML
$xml = gps | ConvertTo-XML
$xml.Save()
%}

{% inline_code lang:PowerShell CSV
$object = Import-Csv -name test.csv
%}

{% inline_code lang:PowerShell HTML
gps | ConvertTo-HTML | Out-File test.html
%}
