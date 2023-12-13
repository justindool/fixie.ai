import { useState } from "react";
import { CharacterType } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import EpicButton from "../Buttons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { useFlags } from "launchdarkly-react-client-sdk";

function GoodBadSwitch({
  notGood,
  onNotGoodChange,
}: {
  notGood: boolean;
  onNotGoodChange: (val: boolean) => void;
}) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <span className="text-xl md:text-xl text-Holiday-Green">
        Pretty good!
      </span>
      <Switch
        checked={notGood}
        onCheckedChange={onNotGoodChange}
        className="data-[state=unchecked]:bg-Holiday-Green data-[state=checked]:bg-Holiday-Red"
      />
      <span className="text-xl md:text-xl text-Holiday-Red">Not so good!</span>
    </div>
  );
}

function ShareCheckbox() {
  return (
    <div className="flex flex-row gap-4 border rounded-2xl p-4 items-center">
      <Checkbox className="w-8 h-8" />
      <div className="text-Holiday-Green text-xl text-left">
        Generate a shareable video of your call
      </div>
    </div>
  );
}

function FeedbackForm({
  onFeedbackInput,
  onEmailInput,
}: {
  onFeedbackInput: (feedback: string) => void;
  onEmailInput: (email: string) => void;
}) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-[Inter-Regular]">
          Tell us more! (optional)
        </AccordionTrigger>
        <AccordionContent>
          <div className="w-11/12 mx-auto flex flex-col gap-2">
            <div className="font-[Inter-Regular]">
              Thanks for your feedback. Feel free to share more about your
              experience below.
            </div>
            <div>
              <Textarea
                className="font-[Inter-Regular]"
                placeholder="Your feedback here"
                onInput={(e) =>
                  onFeedbackInput((e.target as HTMLTextAreaElement).value)
                }
              />
            </div>
            <div>
              <Input
                className="font-[Inter-Regular]"
                type="text"
                placeholder="Your email (optional)"
                onInput={(e) =>
                  onEmailInput((e.target as HTMLInputElement).value)
                }
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function CallFeedback({
  character,
  open,
  onOpenChange,
  onFeedback,
}: {
  character: CharacterType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFeedback: (good: boolean, feedback: string, email: string) => void;
}) {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [notGood, setNotGood] = useState(false);
  const { sharingEnabled } = useFlags();

  const handleFeedback = (good: boolean) => () => {
    onFeedback(good, feedback, email);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-Holiday-Green text-4xl text-center">
            How was your call with{" "}
            <span className="text-Holiday-Red">{character.name}?</span>
          </DialogTitle>
          <DialogDescription>
            <div className="mx-auto w-full flex flex-col gap-4">
              <div className="mx-auto font-[Inter-Regular] text-sm">
                Your feedback will help make HiSanta better
              </div>
              <div className="mx-auto">
                <GoodBadSwitch notGood={notGood} onNotGoodChange={setNotGood} />
              </div>
              <FeedbackForm
                onEmailInput={setEmail}
                onFeedbackInput={setFeedback}
              />
              {sharingEnabled === true && (
                <div className="w-full">
                  <ShareCheckbox />
                </div>
              )}
              <EpicButton className="w-full" onClick={handleFeedback(true)}>
                Send feedback
              </EpicButton>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
