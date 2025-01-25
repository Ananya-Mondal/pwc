namespace project2.Data
{
    public class MyFlieHandler
    {
        public string Upload(IFormFile mFile)
        {
            string filename = "";
            if(mFile.Length>0 )
            {
                string file_name=mFile.FileName;
                string file_ext=Path.GetExtension(file_name);
                List<string> filesExt = new List<string>() { ".jpg",".gif",".png",".jpeg"};
                if(!filesExt.Contains(file_ext.ToLower() ))
                {
                    return "Invalide file";
                }
                long filesize = mFile.Length;
                if(filesize > 1024*1024*5 )
                {
                    return "Large file";
                }
                string new_filename=Guid.NewGuid().ToString()+file_ext;
                string uploadPath=Path.Combine(Directory.GetCurrentDirectory(),"wwwroot");
                uploadPath=Path.Combine(uploadPath,"images");
                using FileStream fileStream = new FileStream(Path.Combine(uploadPath, new_filename), FileMode.CreateNew);
                             
                mFile.CopyTo(fileStream);

                return new_filename;



            }

            return filename;
        }
    }
}
