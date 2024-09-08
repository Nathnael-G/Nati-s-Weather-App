import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="w-full min-h-12 max-h-22 bg-transparent backdrop-blur-[5px] gap-1 flex flex-wrap justify-evenly items-center">
        <p className="text-white">Made with ❤️</p>
        <p className="text-white">
          © 2024 Nati&apos;s Weather App. All rights reserved.
        </p>
        <ul className="flex items-center justify-center gap-2">
          <li>
            <a
              href="https://t.me/Nathnael_G"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon fa-telegram"
              title="Chat with me on Telegram"
            >
              <FontAwesomeIcon
                icon={faTelegram}
                className="text-white "
                size="2x"
              />
            </a>
          </li>

          <li>
            <a
              href="https://github.com/Nathnael-G/Nati-s-Weather-App"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon fa-github"
              title="View my GitHub profile"

            >
              <FontAwesomeIcon
                icon={faGithub}
                className="text-white"
                size="2x"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/nathnael-getachew-0056772ba/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon fa-github"
              title="Connect with me on LinkedIn"

            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="text-white"
                size="2x"
              />
            </a>
          </li>
        </ul>
      </footer>
  )
}

export default Footer