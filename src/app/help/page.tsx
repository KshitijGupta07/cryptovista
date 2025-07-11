'use client';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-blue-400 mb-4">Need Help?</h1>
      <p className="mb-4 text-gray-300">If you're facing any issues or have questions about CryptoVista, feel free to reach out.</p>

      <div className="bg-gray-800 p-4 rounded-lg shadow max-w-xl">
        <h2 className="text-xl font-semibold mb-2 text-blue-300">Developer Contact</h2>
        <ul className="text-gray-200 space-y-2">
          <li>
            <strong>Name:</strong> Kshitij Gupta
          </li>
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:kshitijvgupta@gmail.com" className="text-blue-400 hover:underline">
              kshitijvgupta@gmail.com
            </a>
          </li>
          <li>
            <strong>LinkedIn:</strong>{' '}
            <a href="https://www.linkedin.com/in/kshitij-gupta-b6669325b/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              linkedin.com/in/kshitij-gupta-b669325b
            </a>
          </li>
          <li>
            <strong>Instagram:</strong>{' '}
            <a href="https://www.instagram.com/kshitij_2503_/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              @kshitij_2503_
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
