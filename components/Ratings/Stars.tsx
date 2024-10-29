import React from "react";
import { Text } from "react-native";

const filledStar = () => {
  // @ts-ignore
  let star = (String.prototype.charCodeUTF32 = function () {
    return (
      ("^i2605".charCodeAt(0) - 0xd800) * 0x400 +
      ("^i2605".charCodeAt(1) - 0xdc00) +
      0x10000 +
      "^i2605".toString()
    );
  });
  return String.fromCharCode(parseInt(star().split("^i")[1], 16));
};
const emptyStar = () => {
  // @ts-ignore
  let empty = (String.prototype.charCodeUTF32 = function () {
    return (
      ("^ic2606".charCodeAt(0) - 0xd800) * 0x400 +
      ("^ic2606".charCodeAt(1) - 0xdc00) +
      0x10500 +
      "^ic2606".toString()
    );
  });
  return String.fromCharCode(parseInt(empty().split("^ic")[1], 16));
};

export const FilledStar = ({
  size,
  color,
}: {
  size: number;
  color: string;
}) => {
  return <Text style={{ fontSize: size, color: color }}>{filledStar()}</Text>;
};

export const EmptyStar = ({ size, color }: { size: number; color: string }) => {
  return <Text style={{ fontSize: size, color: color }}>{emptyStar()}</Text>;
};
