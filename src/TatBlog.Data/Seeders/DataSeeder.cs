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
                },
                new() {
                    FullName = "Fuji Kaze",
                    UrlSlug = "fuji-kaze",
                    Email = "fuji@gmail.com",
                    JoinedDate = new DateTime(2023, 01, 21)
                },
                new() {
                    FullName = "Chillies",
                    UrlSlug = "chillies",
                    Email = "chillies@gmail.com",
                    JoinedDate = new DateTime(2022, 12, 19)
                },
                new() {
                    FullName = "Mizuki Rin",
                    UrlSlug = "mizuki-rin",
                    Email = "mizukirinka@gmail.com",
                    JoinedDate = new DateTime(2022, 6, 19)
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
                },
                new() {
                    Title = "10 Web Development Trends in 2023",
                    ShortDescription = "Robin Wieruch",
                    Description = "The most popular meta framework called Next.js comes on top of React.js. " +
                                  "SSR is all over the place when working with JavaScript frameworks these days.",
                    Meta = "Robin Wieruch",
                    UrlSlug = "10-web-development-trends-in-2023",
                    Published = true,
                    PostedDate = new DateTime(2022, 9, 30, 10, 20, 0),
                    ModifiedDate = null,
                    ViewCount = 10,
                    Author = authors[1],
                    Category = categories[0],
                    Tags = new List<Tag>()
                    {
                        tags[15],
                        tags[16],
                        tags[17],
                    }
                },
                new() {
                    Title = "Creating a resume builder with React, NodeJS and AI",
                    ShortDescription = "Resume builder with AI",
                    Description = "OpenAI GPT-3 is a type of artificial intelligence program developed by OpenAI " +
                                  "that is really good at understanding and processing human language.",
                    Meta = "Resume builder with AI",
                    UrlSlug = "creating-a-resume-builder-with-react-node-js-and-ai",
                    Published = true,
                    PostedDate = new DateTime(2022, 9, 20, 10, 20, 0),
                    ModifiedDate = null,
                    ViewCount = 20,
                    Author = authors[2],
                    Category = categories[1],
                    Tags = new List<Tag>()
                    {
                        tags[7],
                        tags[9],
                        tags[3],
                    }
                },
                new() {
                    Title = "LazyWeb",
                    ShortDescription = "The ultimate resource for developers",
                    Description = "\"Your feedback is incredibly valuable to me as I'm constantly looking for ways to make" +
                                    " Lazyweb the best resource solution for developers. So please don't hesitate to share your thoughts " +
                                    "and help shape the future of this platform,\" says developer.",
                    Meta = "The ultimate resource for developers",
                    UrlSlug = "lazy-web",
                    Published = true,
                    PostedDate = new DateTime(2022, 12, 23, 10, 20, 0),
                    ModifiedDate = null,
                    ViewCount = 12,
                    Author = authors[4],
                    Category = categories[2],
                    Tags = new List<Tag>()
                    {
                        tags[7],
                        tags[9],
                        tags[3],
                    }
                },
                new() {
                    Title = "Custom ScrollBar",
                    ShortDescription = "Custom ScrollBar with Pure CSS",
                    Description = "We must first understand the various components of a scrollbar because each component must be styled separately.",
                    Meta = "Custom ScrollBar with Pure CSS",
                    UrlSlug = "custom-scrollBar",
                    Published = true,
                    PostedDate = new DateTime(2022, 3, 3, 10, 20, 0),
                    ModifiedDate = null,
                    ViewCount = 15,
                    Author = authors[3],
                    Category = categories[4],
                    Tags = new List<Tag>()
                    {
                        tags[7],
                        tags[9],
                        tags[3],
                    }
                }
            };

            _dbContext.Posts.AddRange(posts);
            _dbContext.SaveChanges();

            return posts;
        }

    }
}
