# 🌟 Chirui Huang - Personal Website

> A modern, responsive personal website showcasing research, creative content, and professional achievements in operations, information systems, and technology.

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-chirui.online-556B2F?style=for-the-badge)](https://chirui.online)
[![Built with Jekyll](https://img.shields.io/badge/Built_with-Jekyll-CC0000?style=for-the-badge&logo=jekyll&logoColor=white)](https://jekyllrb.com/)
[![Hosted on GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-181717?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)

---

## ✨ Features

- 🎨 **Modern Design** - Clean, responsive layout with dark mode support
- 🔍 **Smart Search** - Real-time content search functionality
- 📱 **Mobile-First** - Optimized for all screen sizes
- 🎥 **Multimedia** - Integration with YouTube, Bilibili, and podcasts
- 💬 **Guest Book** - Interactive visitor comments
- 🌐 **Multi-Platform** - Connected with LinkedIn, GitHub, and social media

---

## 🚀 Live Site

Visit the website: **[chirui.online](https://chirui.online)**

---

## 💻 Local Development

### Prerequisites

- Ruby 3.x or higher
- Bundler gem

### Quick Start

1. **Install Bundler** (if not already installed)
   ```bash
   gem install bundler
   ```

2. **Clone the repository**
   ```bash
   git clone https://github.com/fredykraft/Chirui.git
   cd Chirui
   ```

3. **Install dependencies**
   ```bash
   bundle install
   ```

4. **Run the development server**
   ```bash
   bundle exec jekyll serve --config _config.yml,_config_dev.yml
   ```

5. **Open in browser**
   - Navigate to [http://localhost:4000/](http://localhost:4000/)

6. **Stop the server**
   - Press `Ctrl + C` in the terminal

---

## 📁 Project Structure

```
├── index.html              # Homepage
├── profile.html            # About/Profile page
├── research.html           # Research showcase
├── podcasts.html           # Podcast content
├── videos.html             # Video gallery
├── tools.html              # Lab/Tools section
├── _layouts/               # Page templates
│   └── default.html        # Main layout
├── _includes/              # Reusable components
│   ├── header.html         # Navigation
│   ├── footer.html         # Footer
│   └── head.html           # Meta tags & CSS
├── _sass/                  # SCSS stylesheets
├── js/                     # JavaScript files
├── _config.yml             # Production config
└── _config_dev.yml         # Development config
```

---

## ⚙️ Configuration

Edit `_config.yml` to customize:

| Setting | Description | Current Value |
|---------|-------------|---------------|
| `title` | Site title | Chirui Huang |
| `description` | Site description | Personal website |
| `url` | Production URL | https://chirui.online |
| `baseurl` | URL subpath | (empty for custom domain) |
| Social links | Connect platforms | LinkedIn, GitHub, YouTube, etc. |

For local development, `_config_dev.yml` overrides production settings.

---

## 🚢 Deployment

### GitHub Pages (Automatic)

1. Push changes to the `main` branch:
   ```bash
   git add .
   git commit -m "Your update description"
   git push origin main
   ```

2. GitHub Pages automatically builds and deploys in 1-3 minutes

3. View the live site at [chirui.online](https://chirui.online)

### Custom Domain

The site uses a custom domain configured via:
- `CNAME` file → `chirui.online`
- DNS settings managed externally

---

## 🛠️ Troubleshooting

<details>
<summary><strong>Bundle command not found</strong></summary>

```bash
gem install bundler
```
</details>

<details>
<summary><strong>Port 4000 already in use</strong></summary>

Kill the process:
```bash
lsof -ti:4000 | xargs kill -9
```

Or use a different port:
```bash
bundle exec jekyll serve --port 4001 --config _config.yml,_config_dev.yml
```
</details>

<details>
<summary><strong>Changes not visible</strong></summary>

1. Hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows/Linux)
2. Restart the Jekyll server
3. Clear browser cache
</details>

---

## 💖 Support This Project

If you find this project inspiring or useful, consider supporting my work:

<div align="center">

[![GitHub Sponsors](https://img.shields.io/badge/Sponsor_on-GitHub-6e5494?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sponsors/fredykraft)
[![PayPal](https://img.shields.io/badge/Donate_via-PayPal-0070ba?style=for-the-badge&logo=paypal&logoColor=white)](https://www.paypal.me/chiruihuang079)

**Your support helps me:**
- 📚 Continue research and content creation
- 🎥 Produce educational videos and podcasts
- 💻 Contribute to open-source projects
- ✨ Develop new tools and resources

</div>

---

## 🤝 Collaborate With Me

I'm always excited to explore new collaboration opportunities!

### Areas of Interest

| 🔬 Research | 🎙️ Content | 💻 Development |
|------------|-----------|---------------|
| Academic partnerships | Podcast interviews | Open-source contributions |
| Co-authoring papers | Video collaborations | Code reviews |
| Joint research projects | Guest appearances | Project partnerships |

### Get in Touch

- 📧 **Email**: [chiruihuang079@gmail.com](mailto:chiruihuang079@gmail.com)
- 💼 **LinkedIn**: [Chirui Huang](https://www.linkedin.com/in/chirui-h-595ba6270)
- 🐙 **GitHub Issues**: [Open an issue](https://github.com/fredykraft/Chirui/issues/new) for ideas
- 🌐 **Website**: [chirui.online](https://chirui.online)

---

## 🔒 Security

- ✅ Environment variables for sensitive data
- ✅ `.gitignore` for local-only files
- ✅ No hardcoded credentials
- ⚠️ Report security issues privately via email

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

Built with:
- [Jekyll](https://jekyllrb.com/) - Static site generator
- [GitHub Pages](https://pages.github.com/) - Hosting platform
- [Feather Icons](https://feathericons.com/) - Beautiful icons

---

<div align="center">

**Made with ❤️ by [Chirui Huang](https://chirui.online)**

⭐ Star this repo if you find it helpful!

</div>

