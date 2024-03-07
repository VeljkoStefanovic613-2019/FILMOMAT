import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <footer>
        <footer className="bg-white  shadow dark:bg-gray-800">
            <div className="w-full mx-auto max-w-screen-2xl p-4 md:flex md:items-center md:justify-between">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link to="/" className="hover:underline">FILMOMAT</Link>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="https://www.instagram.com/veljko.stefanovic_scg/" target="_blank" rel="noreferrer"  className="hover:underline me-4 md:me-6">Instagram</a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/veljko-stefanovic-83a8b1128/" target="_blank" rel="noreferrer" className="hover:underline me-4 md:me-6">LinkedIn</a>
                </li>
                <li>
                    <a href="https://www.instagram.com/veljko.stefanovic_scg/" target="_blank" rel="noreferrer" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="https://www.instagram.com/veljko.stefanovic_scg/" target="_blank" rel="noreferrer" className="hover:underline">Contact</a>
                </li>
            </ul>
            </div>
</footer>

    </footer>
  )
}
