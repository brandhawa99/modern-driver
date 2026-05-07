// import { Button } from "../ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { useWebHaptics } from "web-haptics/react";
// import { motion } from "motion/react";

// function CTA() {
//   const { trigger } = useWebHaptics();
//   return (
//     <div className="mt-40 w-full justify-center flex">
//       <div className="relative">
//         <motion.img
//           className="rounded-2xl h-120 md:h-fit object-cover"
//           src="https://images.unsplash.com/photo-1607585011081-241d2bacb7de?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           crossOrigin="anonymous"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//           alt="CTA Background"
//         />
//         <motion.div
//           className="absolute inset-0 flex items-center justify-center"
//           initial={{ opacity: 0, y: 24 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
//         >
//           <Card className="w-full max-w-sm mx-4 bg-card/95">
//             <CardHeader>
//               <CardTitle>Sign Up For Our Newsletter</CardTitle>
//               <CardDescription>
//                 Stay updated on the latest cars, performance trends, and
//                 standout builds from around the world.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form>
//                 <div className="grid gap-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="moderndriver@example.com"
//                     required
//                   />
//                 </div>
//               </form>
//             </CardContent>
//             <CardFooter className="flex-col gap-2">
//               <Button
//                 type="submit"
//                 className="w-full"
//                 onClick={() => {
//                   trigger([
//                     { duration: 40, intensity: 0.7 },
//                     { delay: 40, duration: 40, intensity: 0.7 },
//                     { delay: 40, duration: 40, intensity: 0.9 },
//                     { delay: 40, duration: 50, intensity: 0.6 },
//                   ]);
//                 }}
//               >
//                 Sign Up
//               </Button>
//             </CardFooter>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default CTA;

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useWebHaptics } from "web-haptics/react";
import { motion } from "motion/react";

function CTA() {
  const { trigger } = useWebHaptics();

  return (
    <div className="mt-40 w-full justify-center flex">
      <div className="relative w-full max-w-5xl">
        <motion.img
          className="rounded-2xl w-full h-120 md:h-125 object-cover"
          src="https://images.unsplash.com/photo-1607585011081-241d2bacb7de?q=80&w=1170&auto=format&fit=crop"
          crossOrigin="anonymous"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          alt="CTA Background"
        />

        {/* Gradient overlay - stronger on left for text legibility */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <motion.div
          className="absolute inset-0 px-8 pb-10 md:px-16 md:pb-14 flex flex-col items-center justify-center text-center md:justify-between md:flex-row md:items-end md:text-left gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <div className="max-w-sm">
            <h2 className="font-cormorant font-light text-3xl md:text-4xl text-white mb-2">
              Stay in the know
            </h2>
            <p className="text-white/60 text-sm leading-relaxed">
              The latest cars, performance trends, and standout builds from
              around the world.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full md:max-w-xs">
            <Label
              htmlFor="email"
              className="text-white/60 text-xs tracking-widest uppercase"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="moderndriver@example.com"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-white/50"
            />
            <button
              type="submit"
              className="w-full py-2.5 text-sm border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 rounded-full"
              onClick={() => {
                trigger([
                  { duration: 40, intensity: 0.7 },
                  { delay: 40, duration: 40, intensity: 0.7 },
                  { delay: 40, duration: 40, intensity: 0.9 },
                  { delay: 40, duration: 50, intensity: 0.6 },
                ]);
              }}
            >
              Sign Up
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CTA;
