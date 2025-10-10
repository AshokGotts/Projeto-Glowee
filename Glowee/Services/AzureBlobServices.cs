using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;

public class AzureBlobService
{
    private readonly string _connectionString;
    private readonly string _containerName;

    public AzureBlobService(IConfiguration config)
    {
        _connectionString = config["AzureStorage:ConnectionString"];
        _containerName = config["AzureStorage:ContainerName"];
    }

    public async Task<string> UploadAsync(IFormFile file)
    {
        var blobClient = new BlobContainerClient(_connectionString, _containerName);
        await blobClient.CreateIfNotExistsAsync();

        var blob = blobClient.GetBlobClient(Guid.NewGuid() + Path.GetExtension(file.FileName));
        using var stream = file.OpenReadStream();
        await blob.UploadAsync(stream, true);

        return blob.Uri.ToString(); // URL pública da imagem
    }
}
