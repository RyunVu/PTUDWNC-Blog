using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using TatBlog.Core.Collections;
using TatBlog.Core.Contracts;
using TatBlog.Services.Blogs;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;
using TatBlog.WebApp.Models;

namespace TatBlog.WebApp.Controllers {
    public class BlogController : Controller{

        private readonly IBlogRepository _blogRepository;
        private IConfiguration _configuration;

        public BlogController(IBlogRepository blogRepository, IConfiguration configuration) {
            _blogRepository = blogRepository;
            _configuration = configuration;
        }

        public async Task<IActionResult> Index(
            [FromQuery(Name = "k")] string keyword = null,
            [FromQuery(Name = "p")] int pageNumber = 1,
            [FromQuery(Name = "ps")] int pageSize = 10) {

            var postQuery = new PostQuery() {
                Published = true,
                Keyword = keyword
            };

            var postsList = await _blogRepository.GetPagedPostsAsync(postQuery, pageNumber, pageSize);

            ViewBag.PostQuery = postQuery;

            return View(postsList);
        }

        public async Task<IActionResult> Category(
            string slug,
            [FromQuery(Name = "p")] int pageNumber = 1,
            [FromQuery(Name = "ps")] int pageSize = 3) {

            var postQuery = new PostQuery() {
                CategorySlug = slug,
                Published = true,
            };

            var postsList = await _blogRepository.GetPagedPostsAsync(postQuery, pageNumber, pageSize);

            ViewBag.PostQuery = postQuery;

            return View(postsList);
        }

        public async Task<IActionResult> Author(
            string slug,
            [FromQuery(Name = "p")] int pageNumber = 1,
            [FromQuery(Name = "ps")] int pageSize = 3) {

            var postQuery = new PostQuery() {
                AuthorSlug = slug,
                Published = true,
            };

            var postsList = await _blogRepository.GetPagedPostsAsync(postQuery, pageNumber, pageSize);

            ViewBag.PostQuery = postQuery;

            return View(postsList);
        }

        public async Task<IActionResult> Tag(
            string slug,
            [FromQuery(Name = "p")] int pageNumber = 1,
            [FromQuery(Name = "ps")] int pageSize = 3) {

            var postQuery = new PostQuery() {
                TagSlug = slug,
                Published = true,
            };

            var postsList = await _blogRepository.GetPagedPostsAsync(postQuery, pageNumber, pageSize);

            ViewBag.PostQuery = postQuery;

            return View(postsList);
        }

        public async Task<IActionResult> Post(
            int year,
            int month,
            int day,
            string slug) {

            var post = await _blogRepository.GetPostAsync(year, month, day, slug);

            await _blogRepository.IncreaseViewCountAsync(post.Id);

            ViewBag.Post = post;

            return View(post);

        }

        public async Task<IActionResult> Archives(
            int year,
            int month,
            [FromQuery(Name = "p")] int pageNumber = 1,
            [FromQuery(Name = "ps")] int pageSize = 3) {

            var postsQuery = new PostQuery() {
                Year = year,
                Month = month,
                Published = true,
            };

            var postsList = await _blogRepository.GetPagedPostsAsync(postsQuery, pageNumber, pageSize);
            ViewBag.Date = new DateTime(year, month, 1);
            ViewBag.Post = postsList;

            return View(postsList);

        }

        public IActionResult About() {
            return View();
        }

        [HttpGet]
        public IActionResult Contact() {
            return View();
        }


        [HttpPost]
        public IActionResult Contact(string email, string subject, string body) {
            try {
                var content = body.Replace("\n", "<br>");

                var emailModel = new EmailModel() {
                    Subject = $"Phản hồi từ {email}",
                    Body = $"{subject}:<br> {content}"
                };

                SendEmail(emailModel);

                ViewBag.Success = true;
                return View();
            }
            catch (Exception e) {
                ModelState.AddModelError("", e.Message);
                return BadRequest(ModelState);
            }

        }

        private void SendEmail(EmailModel emailModel) {
            var host = this._configuration.GetValue<string>("Smtp:Server");
            var port = this._configuration.GetValue<int>("Smtp:Port");
            var fromAddress = this._configuration.GetValue<string>("Smtp:FromAddress");
            var adminAddress = this._configuration.GetValue<string>("Smtp:AdminEmail");
            var userName = this._configuration.GetValue<string>("Smtp:UserName");
            var password = this._configuration.GetValue<string>("Smtp:Password");


            using (MailMessage mail = new MailMessage()) {
                mail.From = new MailAddress(fromAddress);
                mail.To.Add(adminAddress);
                mail.Subject = emailModel.Subject;
                mail.Body = emailModel.Body;
                mail.IsBodyHtml = true;

                using (SmtpClient smtp = new SmtpClient(host, port)) {
                    smtp.Credentials = new NetworkCredential(userName,
                        password);
                    smtp.EnableSsl = true;
                    smtp.Send(mail);
                }
            }
        }

        public IActionResult Rss() 
            => Content("Nội dung sẽ được cập nhật");
    }
}
