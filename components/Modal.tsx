"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const Modal = ({
  title,
  desc,
  btnText,
  onClickFunc,
}: {
  title: string;
  desc: string;
  btnText: string;
  onClickFunc: () => void;
}) => {
  return (
    <main className="flex flex-col items-center min-h-screen justify-center gap-5 p-24 bg-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-black border-slate-700">
          <CardHeader>
            <CardTitle className="text-center text-white">{title}</CardTitle>
          </CardHeader>
          <CardContent className="text-white text-center">
            <p>{desc}</p>
            <Button
              onClick={onClickFunc}
              type="button"
              variant={"outline"}
              className="bg-black mt-5"
            >
              {btnText}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
};

export default Modal;
