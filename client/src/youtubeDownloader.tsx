import axios from "axios";
import { useState } from "react";

function YoutubeDownloader() {
	const [urlValue, setUrlValue] = useState<string>("");
  const [data, setData] = useState<any>(null); 
  const [selectedFormatUrl, setSelectedFormatUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://helloytdownload-backend.vercel.app/download', { url: urlValue });
      setData(response.data);
      setUrlValue('');
      setSelectedFormatUrl('');
    } catch (error) {
      console.error("Error downloading video", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFormatUrl(e.target.value);
  };
  return (
	<>
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="flex items-center mb-6">
       
        <h1 className="text-4xl font-bold ml-4 text-gray-800">
          <span className="text-red-700">YouTube</span> Downloader
        </h1>
      </div>
      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter URL"
          value={urlValue}
          onChange={(e) => setUrlValue(e.target.value)}
          className="outline-none p-2 bg-white border-2 border-gray-300 rounded-md shadow-md w-80 mb-4"
        />
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Downloading...' : 'Download'}
        </button>
      </div>
      <div className="mt-3 w-full text-center flex-col items-center justify-center">
        {data ? (
          <div className="mt-10 ">
            <iframe
              width="570"
              height="320"
              src={data.url}
              title="YouTube video"
              className="mb-4 rounded-lg shadow-md mx-auto"
            />
            <div>
              <select
                className="p-2 mx-5 border-2 border-gray-300 rounded-md shadow-md mb-4"
                onChange={handleFormatChange}
                value={selectedFormatUrl}
              >
                <option value="" disabled>Select a format</option>
                {data.info.map((format:any, index:any) => (
                  <option key={index} value={format.url}>
                    {`${format.mimeType.split(';')[0]} ${format.hasVideo ? format.height + 'p' : ''}`}
                  </option>
                ))}
              </select>
              {selectedFormatUrl && (
                <a
                target='_blank'
                  href={selectedFormatUrl}
                  download
                  className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md inline-block hover:bg-green-600 transition duration-300"
                >
                  Download Selected Format
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="text-red-700 font-bold mt-10">No download yet</div>
        )}
      </div>
    </div>
    </>
  )
}

export default YoutubeDownloader