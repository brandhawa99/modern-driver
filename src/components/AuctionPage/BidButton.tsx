import confetti from "canvas-confetti";
import { useRef, useState } from "react";
import { GavelIcon } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { useAuctionStore } from "@/store/auctionStore";
import { useWebHaptics } from "web-haptics/react";
import { formatPrice } from "@/lib/utils";

const COLORS = [
  "#c9a84c",
  "#ff595e",
  "#ffca3a",
  "#6a4c93",
  "#1982c4",
  "#8ac926",
  "#ff924c",
  "#ffffff",
  "#ff99c8",
];

const BidButton = ({
  carId,
  disabled,
}: {
  carId: string;
  disabled: boolean;
}) => {
  const placeBid = useAuctionStore((state) => state.placeBid);
  const currentBid = useAuctionStore((state) => state.bidsByCarId[carId] || 0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [disable, setDisable] = useState(false);
  const [buttonTxt, setButtonTxt] = useState("");
  const { trigger } = useWebHaptics();

  const handleBid = () => {
    placeBid(carId);
    trigger([{ duration: 30 }, { delay: 60, duration: 40, intensity: 1 }]);

    setDisable(true);
    setButtonTxt("Placing Bid...");

    setTimeout(() => {
      setDisable(false);
      setButtonTxt("");
    }, 2000);
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    // convert button position to 0-1 viewport percentages
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 40,
      angle: 10,
      spread: 50,
      origin: { x, y },
      colors: COLORS,
      startVelocity: 20,
    });
    confetti({
      particleCount: 40,
      angle: 170,
      spread: 50,
      origin: { x, y },
      colors: COLORS,
      startVelocity: 20,
    });
  };
  return (
    <Button
      ref={buttonRef}
      disabled={disabled || disable}
      onClick={handleBid}
      className="order-first sm:order-last cursor-pointer rounded w-full sm:w-50 p-0  h-8"
    >
      <GavelIcon color="#fff" />
      {buttonTxt !== ""
        ? buttonTxt
        : "Place Bid — " + formatPrice(currentBid + 500)}
    </Button>
  );
};

export default BidButton;
