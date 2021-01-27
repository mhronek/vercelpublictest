import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="container mx-auto px-3 py-1">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp
