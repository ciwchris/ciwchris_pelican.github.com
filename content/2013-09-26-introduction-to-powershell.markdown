Title: Introduction to PowerShell
Date: 2013-09-26 21:41
Category: 
Tags: powershell
Slug: introduction-to-powershell
Author: Chris
Summary: 

Notes from the Pluralsight course [Introduction to PowerShell](http://pluralsight.com/training/Courses/TableOfContents/powershell-intro)

### Introduction

{% include_code lang:PowerShell Aliases
get-alias
set-alias list get-childitem
export-alias myalias.csv lis*
import-alias myalias.csv
%}

{% include_code lang:PowerShell Help
get-command -verb "get"
get-command -noun "service"
get-command -? # Help on get-command
%}

{% include_code lang:PowerShell
gci |
  where-object { $_.length -gt 100kb } |
  sort-object length |
  ft -property name, length -autosize
%}

{% include_code lang:PowerShell Providers
get-psprovider
get-psdrive
clear-host
set-location env:
gci
set-location alias:
gci
get-pssnapin
get-pssnapin -registered
add-pssnapin SqlServerCmdletSnapin100
remove-pssnapin SqlServerCmdletSnapin100
%}

### Variables

{% include_code lang:PowerShell
$hi = "Hello World"
$hi # same is write-host $hi
[System.Int32]$myint = 42 # or [int] $myint = 42
%}

Comparisons

- -eq
- -ne
- -gt
- -lt
- -ge
- -le
- -Like # wildcard matching
- -NotLike
- -Match # regex matching
- -NotMatch
- Data on right side of comparison is converted to the data type of the left side

{% include_code lang:PowerShell *-Variable
New-Variable  -Name var -Value 123
Get-Variable var -valueonly
Get-Variable
Set-Variable -Name var -Value 789
Clear-Variable -Name var
Remove-Variable -Name var
%}

{% include_code lang:PowerShell Strings
"Hello ""Word"""
$heretext = @"
text
more
	with a tab
	ending
"@
"There are $((gci).count) items"
%}
Special characters

- b: backspace
- n: newline
- r: carriage return
- t: tab

{% include_code lang:PowerShell Array
$array = "one", "two"
$array = @("one", "two") # formal syntax
$array = 1..5 # range
$array[0]
$array -contain 2
$array -notcontain 20
%}

{% include_code lang:PowerShell HashTables
$hash = @{"Key" = "Value" }
$hash["Key"]
$hash."Key"
$mykey = "Key"
$hash.$mykey
$hash.$($mykey) # can use an expression
$hash.Remove("Key")
$hash.Contains("Key")
$hash.ContainsValue("Value")
$hash.Keys
$hash.Values
$hash.Key -contains "Key"
$hash.Value -contains "Value"
%}

Built in variables

- $true, $false
- $null
- $pwd
- $home
- $host
- $pid
- $psversiontable
- $_

### Programming

{% include_code lang:PowerShell switch
switch -casesensitive -wildcard ("test", "hello")
{
	"Te*" {"Found test"; break}
	"hello" {"Found hello"; break}
	default {"Found none"}
}
%}

{% include_code lang:PowerShell for loops
$i = 0
for (; $i -lt < 5; $i++)
{
	$i
}
foreach ($file in gci)
{
	$file.name
}
%}

{% include_code lang:PowerShell Script Block
$a = {clear-host; "hello"}
$a
& $a # run the script block
& {clear-host; "hello"}

$value = {41 + 1}
1 + (&$value)

$value = {42; write-host "hello" } # will return 42 and execute the write-host
$value = {return 42; write-host "hello" } # only returns 42
%}

{% include_code lang:PowerShell Passing Parameters
$qa = {
	$question = $args[0]
	$answer = $args[1]
	write-host "$question and the answer $answer"
}
&$qa "What is" "The answer"

$qa = {
	param($question, [string]$answer = "default answer")
	write-host "$question and the answer $answer"
}
&$qa "What is" "The answer"
&$qa -question "What is" -answer "The answer"
&$qa -q "What is" -a "The answer"
%}

{% include_code lang:PowerShell Piplining Parameters
$files = 
{
	param ($headertext = "default header")
	begin { "runs first" }
	process {
		if ($_.name -like "*.ps1")
		{ return $_.Name }
	}
	end { "runs afterward" }
}
gci | &$files
%}

Scoping

- Variables outside a script block are available inside a block
- If set inside the script block it makes a copy
- Only exists while within the script block

{% include_code lang:PowerShell Scopes
$var = 42
& { $var = 33;
	write-host $var
	write-host (Get-Variable var -valueonly -scope 1)}
write-host $var

$global:var = 42 # can be used anywhere
$private:var = 42 # cannot be seen in the script block

Functions
- Parameters are values objects by default
- Can work with the pipeline, like script blocks

{% include_code lang:PowerShell Functions
function  Set-Var([ref] $var)
{
	$var.Value = 33
}
$var = 42
Set-Var ([ref] $var)
%}

{% include_code lang:PowerShell Filters
filter Show-PS1Files
{
	$filename = $_.Name
		if ($filename -like "*.ps1")
		{
			return $_
		}
}
gci | show-ps1files
%}

{% include_code lang:PowerShell Output to the pipeline
function Get-ChildName()
{
	param([switch]$verbose)
	if ($verbose.IsPresent)
	{
		$VerbosePreference = "Continue"
	}
	else
	{
		$VerbosePreference = "SilentlyContinue"
	}
	Write-Verbose "More info here"
	Write-Output (gci | select-object "Name")
}
Get-ChildName -verbose | Where-Object {$_.name -like "*.ps1"}
%}

Help Content: Get-Help about_comment_based_help

- .SYNOPSIS
- .DESCRIPTION
- .PARAMETER
- .EXAMPLE
- .INPUTS
- .OUTPUTS
- .NOTES
- .LINK

{% include_code lang:PowerShell Help Content
function Get-ChildName()
{

	<#
	.SYNOPSIS 
	Adds a file name extension to a supplied name.

	.DESCRIPTION
	Adds a file name extension to a supplied name. 
	Takes any strings for the file name or extension.

	.PARAMETER Name
	Specifies the file name.

	.PARAMETER Extension
	Specifies the extension. "Txt" is the default.

	.INPUTS
	None. You cannot pipe objects to Add-Extension.

	.OUTPUTS
	System.String. Add-Extension returns a string with the extension or file name.

	.EXAMPLE
	C:\PS> extension -name "File"
	File.txt

	.EXAMPLE
	C:\PS> extension -name "File" -extension "doc"
	File.doc

	.EXAMPLE
	C:\PS> extension "File" "doc"
	File.doc

	.LINK
	http://www.fabrikam.com/extension.html

	.LINK
	Set-Item
#>
	Write-Output (gci | select-object "Name")
}
%}

{% include_code lang:PowerShell Files
$a = Get-Content "test.txt"
$a[2] # uses an array to store the contents
$all = [string]::Join([System.Environment]::NewLine, $a) # or `r`n

Set-Content -Value $all -Path "new.txt"
Add-Content -Value "More stuff" -Path "new.txt"
Remove-Item "new.txt"
Test-Path "test.txt"
%}

{% include_code lang:PowerShell XML Filse
$xml = @"
<root>
	<one>value</one>
</root>
"@
$xml | Out-File "test.xml"

$testXml = new-object xml
$testXml.Load("test.xml")
$one = $testXml.root.one
$testXml.Save("test.xml")

[xml]$testXml = Get-Content "test.xml"
%}

{% include_code lang:PowerShell Misc
$choice = Read-Host -Prompt "Select something"
$padding = " " * 10 # repeat an item
%}
