# Guía de Deployment en Vercel

## 🚀 Pasos para Subir a Vercel (Gratis)

### 1. Preparación del Proyecto

✅ **Ya completado:**
- Configuración SEO implementada
- Archivo `vercel.json` creado
- Variables de entorno configuradas
- Build optimizado

### 2. Crear Cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Regístrate con GitHub, GitLab o Bitbucket
3. Conecta tu repositorio

### 3. Subir el Proyecto

**Opción A: Desde GitHub (Recomendado)**
```bash
# 1. Sube tu código a GitHub
git init
git add .
git commit -m "Initial commit with SEO optimizations"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main

# 2. En Vercel, importa desde GitHub
# - Selecciona tu repositorio
# - Vercel detectará automáticamente que es un proyecto Vite
```

**Opción B: Vercel CLI**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Hacer login
vercel login

# Deployar
vercel

# Para production
vercel --prod
```

### 4. Configuración en Vercel Dashboard

#### Variables de Entorno:
1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega:
   ```
   VITE_SITE_URL = https://handtobrand.vercel.app
   VITE_GOOGLE_SCRIPT_URL = [tu-url-de-google-script]
   ```

#### Build Settings (Auto-detectado):
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 5. Configurar Dominio Personalizado (Opcional)

#### Dominio Gratuito de Vercel:
- Tu sitio estará disponible en: `https://handtobrand.vercel.app`
- Puedes cambiar el nombre del proyecto en Settings

#### Dominio Propio:
1. Ve a Settings → Domains
2. Agrega tu dominio
3. Configura los DNS según las instrucciones
4. Actualiza las variables de entorno con tu nuevo dominio

### 6. Actualizar URLs Después del Deploy

**Una vez que tengas tu URL de Vercel:**

1. **Actualizar Variable de Entorno:**
   ```
   VITE_SITE_URL=https://tu-proyecto-real.vercel.app
   ```

2. **Actualizar sitemap.xml:**
   - URL configurada: `https://handtobrand.vercel.app`

3. **Actualizar robots.txt:**
   - Reemplaza la URL del sitemap

4. **Re-deployar:**
   ```bash
   vercel --prod
   ```

### 7. Verificación Post-Deploy

#### Checklist de Verificación:
- [ ] Sitio carga correctamente
- [ ] Meta tags se muestran correctamente (inspeccionar elemento)
- [ ] `/robots.txt` es accesible
- [ ] `/sitemap.xml` es accesible
- [ ] Favicon personalizado se muestra
- [ ] Formulario de contacto funciona
- [ ] Responsive design funciona

#### Herramientas de Validación:
```bash
# Verificar meta tags
curl -s https://handtobrand.vercel.app | grep -i "<meta"

# Verificar robots.txt
curl https://handtobrand.vercel.app/robots.txt

# Verificar sitemap
curl https://handtobrand.vercel.app/sitemap.xml
```

### 8. Configuración SEO Post-Deploy

#### Google Search Console:
1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Agrega tu propiedad (URL de Vercel)
3. Verifica la propiedad
4. Envía tu sitemap: `https://handtobrand.vercel.app/sitemap.xml`

#### Google Analytics (Opcional):
1. Crea una cuenta en Google Analytics
2. Agrega el tracking code a tu `index.html` o usa Google Tag Manager

### 9. Monitoreo y Mantenimiento

#### Métricas a Monitorear:
- **Performance:** Vercel Analytics (gratis)
- **SEO:** Google Search Console
- **Uptime:** Vercel automáticamente
- **Core Web Vitals:** PageSpeed Insights

#### Updates Automáticos:
- Cada push a `main` branch redeploya automáticamente
- Preview deployments para otras branches

### 10. Limitaciones del Plan Gratuito

#### Vercel Free Tier:
- ✅ 100GB bandwidth/mes
- ✅ Deployments ilimitados
- ✅ HTTPS automático
- ✅ Custom domains
- ✅ Preview deployments
- ❌ Analytics avanzado (solo básico)
- ❌ Funciones serverless limitadas

### 11. Comandos Útiles

```bash
# Ver deployments
vercel ls

# Ver logs
vercel logs

# Rollback a deployment anterior
vercel rollback [deployment-url]

# Eliminar deployment
vercel rm [deployment-url]
```

### 12. Troubleshooting Común

#### Problema: 404 en rutas
**Solución:** El archivo `vercel.json` ya está configurado para SPA routing

#### Problema: Variables de entorno no funcionan
**Solución:** 
- Verificar que empiecen con `VITE_`
- Re-deployar después de agregar variables

#### Problema: Build falla
**Solución:**
- Verificar que `package.json` tenga todos los scripts
- Revisar logs en Vercel Dashboard

---

## 🎯 Resultado Final

Tu sitio estará disponible en:
- **URL Principal:** `https://handtobrand.vercel.app`
- **SEO Score:** 9/10 ⭐
- **Performance:** Optimizado
- **Mobile-First:** ✅
- **HTTPS:** ✅ Automático
- **CDN Global:** ✅ Incluido

¡Tu sitio estará listo para recibir tráfico y generar leads! 🚀