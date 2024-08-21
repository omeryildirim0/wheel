import { useState, FormEvent } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ZipcodePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ZipcodePopup: React.FC<ZipcodePopupProps> = ({ isOpen, onClose }) => {
  const [zipcode, setZipcode] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle the zipcode submission here
    console.log('Zipcode entered:', zipcode);
    onClose(); // Close the popup after submission
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto p-6">
        <DialogHeader>
            <DialogTitle>Welcome to the Wheel! Please enter your zipcode to see the wheel.</DialogTitle>
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
