namespace PCLine_computer_shops.Dtos
{
    public class TaskFileGetDto
    {
        public int TaskFileId { get; set; }
        public string FileName { get; set; }
        public byte[] FileContent { get; set; }
    }
}
