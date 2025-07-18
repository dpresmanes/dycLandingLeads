#!/usr/bin/env node

/**
 * Script para actualizar URLs después del deployment en Vercel
 * Uso: node update-urls.js https://tu-proyecto.vercel.app
 */

const fs = require('fs');
const path = require('path');

function updateUrls(newUrl) {
  if (!newUrl) {
    console.error('❌ Error: Debes proporcionar la nueva URL');
    console.log('Uso: node update-urls.js https://tu-proyecto.vercel.app');
    process.exit(1);
  }

  // Validar URL
  try {
    new URL(newUrl);
  } catch (error) {
    console.error('❌ Error: URL inválida');
    process.exit(1);
  }

  console.log(`🔄 Actualizando URLs a: ${newUrl}`);

  // 1. Actualizar sitemap.xml
  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    let sitemap = fs.readFileSync(sitemapPath, 'utf8');
    sitemap = sitemap.replace(/https:\/\/tu-proyecto\.vercel\.app/g, newUrl);
    fs.writeFileSync(sitemapPath, sitemap);
    console.log('✅ sitemap.xml actualizado');
  }

  // 2. Actualizar robots.txt
  const robotsPath = path.join(__dirname, 'public', 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    let robots = fs.readFileSync(robotsPath, 'utf8');
    robots = robots.replace(/https:\/\/tu-proyecto\.vercel\.app/g, newUrl);
    fs.writeFileSync(robotsPath, robots);
    console.log('✅ robots.txt actualizado');
  }

  // 3. Actualizar .env
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    let env = fs.readFileSync(envPath, 'utf8');
    env = env.replace(/VITE_SITE_URL=.*/g, `VITE_SITE_URL=${newUrl}`);
    fs.writeFileSync(envPath, env);
    console.log('✅ .env actualizado');
  }

  console.log('\n🎉 ¡URLs actualizadas correctamente!');
  console.log('\n📋 Próximos pasos:');
  console.log('1. Hacer commit de los cambios:');
  console.log('   git add .');
  console.log('   git commit -m "Update URLs for production"');
  console.log('   git push');
  console.log('\n2. O re-deployar en Vercel:');
  console.log('   vercel --prod');
  console.log('\n3. Verificar en:');
  console.log(`   ${newUrl}/robots.txt`);
  console.log(`   ${newUrl}/sitemap.xml`);
}

// Obtener URL del argumento de línea de comandos
const newUrl = process.argv[2];
updateUrls(newUrl);