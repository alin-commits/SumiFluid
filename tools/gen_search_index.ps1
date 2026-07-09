# Regenera assets/js/search-index.js a partir de <title>/<meta description>/<h1> de cada
# pagina real del sitio. Ejecutar (desde PowerShell) cada vez que se anada, borre o
# renombre una pagina, o se cambien su titulo/descripcion.
#
# Uso:  powershell -File tools/gen_search_index.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

$catLabel = @{
  "hidraulica"   = [char]0x00CD -replace '.*',"Hidr$([char]0x00E1)ulica"
}
# (los nombres de categoria con tilde se definen abajo para evitar problemas de codificacion
#  al guardar este archivo; ver bloque siguiente)
$catLabel = @{}
$catLabel["hidraulica"]   = "Hidr" + [char]0x00E1 + "ulica"
$catLabel["neumatica"]    = "Neum" + [char]0x00E1 + "tica"
$catLabel["estanqueidad"] = "Estanqueidad"
$catLabel["vacio"]        = "Vac" + [char]0x00ED + "o"
$catLabel["blog"]         = "Blog"
$catLabel["marcas"]       = "Marcas"
$catLabel["contacto"]     = "Contacto"

function Get-EntryFor($path, $root) {
  $content = [System.IO.File]::ReadAllText($path)
  $title = [regex]::Match($content, '<title>(.*?)</title>').Groups[1].Value
  $desc = [regex]::Match($content, '<meta name="description" content="([^"]*)">').Groups[1].Value
  $h1 = [regex]::Match($content, '<h1[^>]*>(.*?)</h1>', [System.Text.RegularExpressions.RegexOptions]::Singleline).Groups[1].Value
  $h1 = ($h1 -replace '<br\s*/?>', ' ') -replace '\s+', ' '
  $h1 = $h1.Trim()
  $ogImage = [regex]::Match($content, '<meta property="og:image" content="https://sumifluid\.com/([^"]*)">').Groups[1].Value

  $rel = $path.Substring($root.Length + 1).Replace('\', '/')
  $segs = $rel -split '/'
  if ($segs.Length -eq 1) {
    $cat = if ($segs[0] -eq "index.html") { "Inicio" } else { "General" }
    $url = $segs[0]
  } else {
    $folder = $segs[0]
    $cat = if ($catLabel.ContainsKey($folder)) { $catLabel[$folder] } else { $folder }
    $url = $rel
  }

  $name = if ($h1) { $h1 } else { $title }

  return [PSCustomObject]@{
    title = $name
    url = $url
    category = $cat
    description = $desc
    image = $ogImage
  }
}

$entries = @()

foreach ($f in @("index.html")) {
  $p = Join-Path $root $f
  if (Test-Path $p) { $entries += Get-EntryFor $p $root }
}

foreach ($cat in @("hidraulica","neumatica","estanqueidad","vacio","marcas","contacto","blog")) {
  $dir = Join-Path $root $cat
  if (Test-Path $dir) {
    Get-ChildItem $dir -Filter "*.html" | Sort-Object Name | ForEach-Object {
      $entries += Get-EntryFor $_.FullName $root
    }
  }
}

Write-Host "Total entries: $($entries.Count)"

function JsonEscape($s) {
  if ($null -eq $s) { return "" }
  return $s -replace '\\','\\\\' -replace '"','\"'
}

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine("// Generado automaticamente -- ver tools/gen_search_index.ps1. Regenerar tras anadir/editar paginas.")
[void]$sb.AppendLine("var SUMIFLUID_SEARCH_INDEX = [")
foreach ($e in $entries) {
  $line = '  { "title": "' + (JsonEscape $e.title) + '", "url": "' + (JsonEscape $e.url) + '", "category": "' + (JsonEscape $e.category) + '", "description": "' + (JsonEscape $e.description) + '", "image": "' + (JsonEscape $e.image) + '" },'
  [void]$sb.AppendLine($line)
}
[void]$sb.AppendLine("];")

$outPath = Join-Path $root "assets\js\search-index.js"
[System.IO.File]::WriteAllText($outPath, $sb.ToString(), $utf8NoBom)
Write-Host "Written to $outPath"
