import GoogleLogoIcon from "../../../public/svg/google-icon-logo.svg";

interface GoogleIconProps {
  className?: string;
}

export function GoogleIcon({ className }: GoogleIconProps) {
  return (
    <img src={GoogleLogoIcon} alt="Google logo icon" className={className} />
  );
}
