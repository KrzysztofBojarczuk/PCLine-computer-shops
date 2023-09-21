using Microsoft.EntityFrameworkCore;
using PCLine_computer_shops.AutoMapper;
using PCLine_computer_shops.Data;
using PCLine_computer_shops.InterfaceReposiotry;
using PCLine_computer_shops.Repositories;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigins",
        builder =>
        {
            builder
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
}
);

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));


builder.Services.AddScoped<IProductRepository, ProductRepository>();

builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowOrigins");
app.UseAuthorization();

app.MapControllers();

app.Run();
