[![Laravel Forge Site Deployment Status](https://img.shields.io/endpoint?url=https%3A%2F%2Fforge.laravel.com%2Fsite-badges%2F4a94f5fa-7a25-4af8-9dec-ff0900c9c25d%3Fdate%3D1&style=plastic)](https://forge.laravel.com/servers/741129/sites/2186314)
![Unit tests](https://github.com/gcazin/x-memes/actions/workflows/test.yml/badge.svg)

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/gcazin/x-memes">
    <img src="./public/images/favicon.png" alt="Logo" width="150">
  </a>

<h1 align="center">X-Memes</h3>

  <p align="center">
    Find your favorite memes in a flash!
    <br />
    <br />
    <a href="https://x-memes.com">See the site</a>
    ·
    <a href="https://github.com/gcazin/x-memes/issues">Report a bug</a>
    ·
    <a href="https://github.com/gcazin/x-memes/issues">Feature request</a>
  </p>
</div>

## 🖼️ Screenshot

![Product Name Screen Shot](./public/images/home.png)

### Build with

[![Laravel][Laravel.com]][Laravel-url]
[![Vue][Vue.js]][Vue-url]

## 🚀 Getting started

To set up a local copy and get it up and running, follow the simple steps in this example.

### ⚙️ Installation

#### With docker

You must first have [Laravel Sail](https://laravel.com/docs/11.x/sail) installed.

All you have to do is execute the command:

```bash
sail up
```

#### Normal installation

1. Clone the repo
    ```sh
    git clone https://github.com/gcazin/x-memes.git
    ```
2. Installing dependencies
    ```sh
    composer install
    ```
3. Installing NPM packages
    ```sh
    npm install
    ```
4. Start the project
    ```sh
    php artisan serve
    ```
    ```sh
    npm run dev
    ```

## 🛣️ Roadmap

-   [ ] Automatically attach the avatar to the user when they register with a social network.
- [ ] To be able to see who liked the memes.
- [ ] Use twitter's API to automatically post new ones.
- [ ] Correct watermark size for videos

See [issues](https://github.com/gcazin/x-memes/issues) for a full list of proposed features (and known issues).

## Running Tests

To run tests, run the following command

```bash
  ./vendor/bin/pest
```

## ✍🏻 Contribute

Contributions are what make the open source community an extraordinary place to learn, inspire and create. All your contributions are **very much appreciated**.

If you have a suggestion for improving this project, please fork the repo and create a pull request. You can also simply open an issue with the "enhancement" tag. Don't forget to give the project a star! Thanks to all!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/ma-fonctionnalite`)
3. Start your changes (`git commit -m 'Add some ma-fonctionnalite'`)
4. Push towards your branch (`git push origin feature/ma-fonctionnalite`)
5. Open a pull request

## 📄 License

Distributed under the MIT license. See `LICENSE.txt` for more information.

## 🔗 Contact

Guillaume - [@gcazinonx](https://twitter.com/gcazinonx) - contact@guillaume-cazin.fr

Project link: [https://github.com/gcazin/x-memes](https://github.com/gcazin/x-memes)

[contributors-shield]: https://img.shields.io/github/contributors/gcazin/x-memes.svg?style=for-the-badge
[contributors-url]: https://github.com/gcazin/x-memes/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/gcazin/x-memes.svg?style=for-the-badge
[forks-url]: https://github.com/gcazin/x-memes/network/members
[stars-shield]: https://img.shields.io/github/stars/gcazin/x-memes.svg?style=for-the-badge
[stars-url]: https://github.com/gcazin/x-memes/stargazers
[issues-shield]: https://img.shields.io/github/issues/gcazin/x-memes.svg?style=for-the-badge
[issues-url]: https://github.com/gcazin/x-memes/issues
[license-shield]: https://img.shields.io/github/license/gcazin/x-memes.svg?style=for-the-badge
[license-url]: https://github.com/gcazin/x-memes/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Vue-url]: https://tailwindcss.css/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
