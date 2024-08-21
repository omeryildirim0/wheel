import { useState, FormEvent } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ZipcodePopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (zipcode: string) => void;  // Add the onSubmit prop
  }
  
  const ZipcodePopup: React.FC<ZipcodePopupProps> = ({ isOpen, onClose, onSubmit }) => {
    const [zipcode, setZipcode] = useState<string>('');
  
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      onSubmit(zipcode);  // Call the onSubmit function passed as a prop
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md mx-auto p-6">
          <DialogHeader>
            <DialogTitle>Enter Your Zipcode</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              className="border rounded-md p-2 text-center"
              placeholder="Enter zipcode"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              required
            />
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default ZipcodePopup;
