import { defineConfig } from 'vite'  
export default defineConfig({ 
    build: {  
        minify: true  
    },  
    css: {  
        minify: true  
    },  
    assetFileNames: `assets/[name].min.[ext]`  
})  
