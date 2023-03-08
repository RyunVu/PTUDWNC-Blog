using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using TatBlog.Core.Entities;
using TatBlog.Data.Mappings;


namespace TatBlog.Data.Contexts {
    public class BlogDbContext : DbContext{

        public DbSet<Author> Authors { get; set; }
        public DbSet<Category> Categories{ get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Subscriber> Subscribers { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnConfiguring(
            DbContextOptionsBuilder optionBuilder) {
            optionBuilder.UseSqlServer(@"Server=DESKTOP-7NPFO5S;Database=TatBlog;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.ApplyConfigurationsFromAssembly(
                typeof(CategoryMap).Assembly);
        }


    }
}
