using TatBlog.Core.Entities;
using TatBlog.Data.Contexts;

namespace TatBlog.Data.Seeders {
    public class DataSeeder : IDataSeeder {

        private readonly BlogDbContext _dbContext;

        public DataSeeder(BlogDbContext dbContext) {
            _dbContext = dbContext;
        }

        public void Initialize() {
            _dbContext.Database.EnsureCreated();

            if (_dbContext.Posts.Any()) return;

            var authors = AddAuthors();
            var categories = AddCategories();
            var tags = AddTags();
            var posts = AddPosts(authors, categories, tags);

        }

        private IList<Author> AddAuthors() {
            var authors = new List<Author>() {
                new() {
                    FullName = "Jason Mouth",
                    UrlSlug = "jason-mouth",
                    Email = "json@gmail.com",
                    JoinedDate = new DateTime(2022,10,21)
                },
                new() {
                    FullName = "Jessica Wonder",
                    UrlSlug = "jessica-wonder",
                    Email = "jessica665@motip.com",
                    JoinedDate = new DateTime(2022,4,19)
                }
            };

            _dbContext.Authors.AddRange(authors);
            _dbContext.SaveChanges();

            return authors;
        }

        private IList<Category> AddCategories() {
            var categories = new List<Category>() {
                new() {Name = ".NET Core", Description = ".NET Core", UrlSlug = "net-core"},
                new() {Name = "Architecture", Description = "Architecture", UrlSlug = "architecture"},
                new() {Name = "Messaging", Description = "Messaging", UrlSlug = "messaging"},
                new() {Name = "OOP", Description = "Object-Oriented Program", UrlSlug = "oop"},
                new() {Name = "Design Patterns", Description = "Design Patterns", UrlSlug = "design-patterns"},
                new() {Name = "React", Description = "React is JavaScript library", UrlSlug = "react-js"},
                new() {Name = "Angular", Description = "Angular is a TypeScript-based", UrlSlug = "Angular-js"},
                new() {Name = "Vue.js", Description = "Vue.js is an open-source model–view–viewmodel", UrlSlug = "vue-js"},
                new() {Name = "Next.js", Description = "Next.js is an open-source web", UrlSlug = "next-js"},
                new() {Name = "Node.js", Description = "Node.js is a cross-platform, open-source server", UrlSlug = "node-js"},
            };

            _dbContext.Categories.AddRange(categories);
            _dbContext.SaveChanges();

            return categories;
        }
        private IList<Tag> AddTags() {
            var tags = new List<Tag>() {
                new() {Name = "Google", Description = "Google Application", UrlSlug = "google"},
                new() {Name = "ASP.NET MVC", Description = "ASP.NET MVC", UrlSlug = "asp-net-mvc"},
                new() {Name = "Razor Page", Description = "Razor Page", UrlSlug = "razor-page"},
                new() {Name = "Blazor", Description = "Blazor", UrlSlug = "blazor"},
                new() {Name = "Deep Learning", Description = "Deep Learning", UrlSlug = "deep-learning"},
                new() {Name = "Neural Network", Description = "Neural Network", UrlSlug = "neural-network"},
                new() {Name = "Front-End Applications", Description = "Consisting of all visual and interactive elements, this side of the site can be experienced by all users.", UrlSlug = "font-end-application"},
                new() {Name = "Visual Studio", Description = "An integrated development environment from Microsoft.", UrlSlug = "visual-studio"},
                new() {Name = "SQL Server", Description = "A relational database management system developed by Microsoft.", UrlSlug = "sql-server"},
                new() {Name = "Git", Description = "Git is a distributed version control system that tracks changes in any set of computer files, usually used for coordinating work among programmers", UrlSlug = "git"},
                new() {Name = "EF Core", Description = "A lightweight, extensible, open source and cross-platform version of the popular Entity Framework data access technology", UrlSlug = "entity-framework"},
                new() {Name = ".NET Framework", Description = "A proprietary software framework developed by Microsoft.", UrlSlug = "net-framework"},
                new() {Name = "ASP.NET Core", Description = ".NET is a free and open-source, managed computer software framework for Windows, Linux, and macOS operating systems", UrlSlug = "aspnet-core"},
                new() {Name = "Postman", Description = "Postman is an API platform for developers to design, build, test and iterate their APIs.", UrlSlug = "postman"},
                new() {Name = "ChatGPT", Description = "A chat-bot developed by OpenAI.", UrlSlug = "chat-gpt"},
                new() {Name = "Data cleansing", Description = "Data cleaning is the process of fixing or removing incorrect, corrupted, incorrectly formatted, duplicate, or incomplete data within a data-set.", UrlSlug = "data-cleansing"},
                new() {Name = "Fetch api", Description = "he Fetch API provides a JavaScript interface for accessing and manipulating parts of the protocol, such as requests and responses.", UrlSlug = "fetch-api"},
                new() {Name = "Microsoft", Description = "Microsoft", UrlSlug = "microsoft"},
                new() {Name = "Microservices", Description = "An approach to building an application that breaks its functionality into modular components.", UrlSlug = "microservices"},
                new() {Name = "Web API security", Description = "Web API security entails authenticating programs", UrlSlug = "web-api-security"}
            };

            _dbContext.Tags.AddRange(tags);
            _dbContext.SaveChanges();

            return tags;
        }
        private IList<Post> AddPosts(IList<Author> authors, IList<Category> categories, IList<Tag> tags){
            var posts = new List<Post>() {
                new() {
                     Title = "ASP.NET Core Diagnostic Scenarios",
                    ShortDescription = "David and friend has great repository filled",
                    Description = "Here's a few great DON'T and DO example",
                    Meta = "David and friend has great repository filled",
                    UrlSlug = "aspnet-core-diagnostic-scenarios",
                    Published = true,
                    PostedDate = new DateTime(2021, 9, 30, 10, 20, 0),
                    ModifiedDate = null,
                    ViewCount = 10,
                    Author = authors[0],
                    Category = categories[0],
                    Tags = new List<Tag>()
                    {
                        tags[0]
                    }
                }
            };

            _dbContext.Posts.AddRange(posts);
            _dbContext.SaveChanges();

            return posts;
        }

    }
}
