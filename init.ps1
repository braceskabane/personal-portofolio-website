# init.ps1

Write-Host "🔧 Initializing Portfolio Project..."

# Membuat folder src dan sub-folder
$folders = @(
    "src/app",
    "src/components/ui/Button",
    "src/components/ui/Input",
    "src/components/ui/Card",
    "src/components/common/Navigation",
    "src/components/sections/HeroSection",
    "src/components/sections/AboutSection",
    "src/components/sections/ExperienceSection",
    "src/components/sections/ProjectsSection",
    "src/components/sections/SkillsSection",
    "src/components/sections/ContactSection",
    "src/components/layouts/MainLayout",
    "src/hooks",
    "src/services/api",
    "src/services/animation",
    "src/services/validation",
    "src/stores",
    "src/types",
    "src/utils",
    "src/styles",
    "src/data",
    "public/images",
    "public/icons",
    "docs",
    "tests/__mocks__",
    "tests/components",
    "tests/hooks",
    "tests/utils"
)

foreach ($folder in $folders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder | Out-Null
        Write-Host "📁 Created: $folder"
    }
}

# Membuat file kosong sebagai penanda
$files = @(
    "src/app/globals.css",
    "src/app/layout.tsx",
    "src/app/page.tsx",
    "src/app/loading.tsx",
    "src/components/ui/Button/Button.tsx",
    "src/components/ui/Button/Button.types.ts",
    "src/components/ui/Button/index.ts",
    "src/components/common/Navigation/Navigation.tsx",
    "src/components/common/Navigation/Navigation.types.ts",
    "src/components/common/Navigation/NavigationItem.tsx",
    "src/components/common/Navigation/index.ts",
    "src/hooks/index.ts",
    "src/services/api/index.ts",
    "src/services/animation/index.ts",
    "src/services/validation/index.ts",
    "src/stores/index.ts",
    "src/types/index.ts",
    "src/utils/index.ts",
    "src/styles/globals.css",
    "src/styles/animations.css",
    "src/styles/themes.css",
    "src/styles/components.css",
    "src/data/index.ts",
    "public/favicon.ico",
    "docs/ARCHITECTURE.md",
    "docs/COMPONENTS.md",
    "docs/DEPLOYMENT.md",
    "next.config.js",
    "tailwind.config.js",
    "tsconfig.json",
    ".env.local",
    ".env.example",
    "package.json",
    "README.md"
)

foreach ($file in $files) {
    if (-not (Test-Path $file)) {
        New-Item -ItemType File -Path $file | Out-Null
        Write-Host "📄 Created: $file"
    }
}

Write-Host "`n✅ Initialization Complete."
