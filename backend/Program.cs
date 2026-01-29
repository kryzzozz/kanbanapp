using KanbanApi.Settings; // Importante: usar tus Settings
using Microsoft.Extensions.Options; // Importante: para leer opciones
using MongoDB.Driver; // Importante: el driver oficial

var builder = WebApplication.CreateBuilder(args);

// --- 1. CONFIGURACIÓN DE MONGODB ---
// Leemos la sección del appsettings.json y la mapeamos a la clase
builder.Services.Configure<MongoDbSettings>(
builder.Configuration.GetSection("MongoDbSettings"));

// Registramos el Cliente de MongoDB como un "Singleton" (una sola instancia para toda la app)
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    return new MongoClient(settings.ConnectionString);
});

// Registramos la Base de Datos específica para inyectarla directo
builder.Services.AddScoped<IMongoDatabase>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    var client = sp.GetRequiredService<IMongoClient>();
    return client.GetDatabase(settings.DatabaseName);
});

// REGISTRAR NUESTROS SERVICIOS
builder.Services.AddScoped<KanbanApi.Services.BoardService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

// 1. DEFINIR LA POLÍTICA CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// 2. ACTIVAR LA POLÍTICA
app.UseCors("AllowAngular");

//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();