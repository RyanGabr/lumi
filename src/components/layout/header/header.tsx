import { ProfileOptions } from "./profile-options";
import { Options } from "./options";

export function Header() {
  return (
    <div className="fixed top-0 bg-background w-full z-50">
      <div className="flex items-center justify-between py-3 px-5">
        {/* Left side */}
        <div>
          <ProfileOptions />
        </div>

        {/* Right side */}
        <div>
          <Options />
        </div>
      </div>
    </div>
  );
}
