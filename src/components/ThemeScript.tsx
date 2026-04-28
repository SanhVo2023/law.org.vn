// Inline script to set the initial theme class before paint — prevents light/dark flash.
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&p)){document.documentElement.classList.add('dark')}}catch(e){}})();`
  return <script dangerouslySetInnerHTML={{ __html: code }} />
}
