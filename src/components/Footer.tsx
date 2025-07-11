// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center mt-10 border-t border-gray-700">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} CryptoVista. Built with 💙 by{' '}
        <a href="https://www.linkedin.com/in/kshitij-gupta-b6669325b/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
          Kshitij Gupta
        </a>
      </p>
    </footer>
  );
}
