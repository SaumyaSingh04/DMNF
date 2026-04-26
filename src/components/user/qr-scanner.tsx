import { Scanner } from "@yudiel/react-qr-scanner";
import { useToast } from "../ui/use-toast";

const QRScanner = () => {
  const { toast } = useToast();

  const handleScan = (redirectUrl: string) => {
    if (!redirectUrl) {
      toast({
        title: "Unable to fetch QR Code",
      });
    }

    window.location.replace(redirectUrl);
  };

  return (
    <div className="p-4 flex-1 flex flex-col">
      <h2 className="text-lg border-b-2 border-custom-dark-blue pb-4 text-custom-blue">
        Scan QR Code
      </h2>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[300px] aspect-square">
          <Scanner onScan={(result) => handleScan(result[0].rawValue)} />
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
