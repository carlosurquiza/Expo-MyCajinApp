import React from 'react';
import { Text, TextStyle } from 'react-native';

export const renderFormattedText = (text: string, baseStyle: TextStyle, boldStyle: TextStyle) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <Text style={baseStyle}>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <Text key={`bold-${index}-${part}`} style={boldStyle}>
              {part.substring(2, part.length - 2)}
            </Text>
          );
        }
        return part;
      })}
    </Text>
  );
};