using TatBlog.WebApp.Extensions;
using TatBlog.WebApp.Mapsters;

var builder = WebApplication.CreateBuilder(args); {
    builder
        .ConfigureMvc()
        .ConfigureServices()
        .ConfigureMapster();
}

var app = builder.Build(); {
    app.UseRequestPipeLine();
    app.UseBlogRoutes();
    app.UseDataSeeder();
}

app.Run();