import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import useGameState from "@/hooks/store";
import { motion } from "framer-motion";

const ModalIntro = () => {
  const updateModalIntroState = useGameState((state) => state.changeModalIntro);
  return (
    <main className="flex flex-col items-center min-h-screen justify-center gap-5 p-24 bg-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-black border-slate-700">
          <CardHeader>
            <CardTitle className="text-center text-white">
              Tips Sebelum Bermain
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white text-center">
            <p>Gunakan headphone untuk kenyamanan bermain</p>
            <Button
              onClick={updateModalIntroState}
              type="button"
              variant={"outline"}
              className="bg-black mt-5"
            >
              Mengerti!
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
};

export default ModalIntro;
