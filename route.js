// src/app/api/bfhl/route.js

import { NextResponse } from 'next/server';

// POST method
export async function POST(request) {
  const { data } = await request.json();

  let numbers = [];
  let alphabets = [];
  let highest_alphabet = [];

  // Separate numbers and alphabets from the data
  data.forEach(item => {
    if (isNaN(item)) {
      alphabets.push(item);
    } else {
      numbers.push(item);
    }
  });

  // Find highest alphabet (case insensitive)
  if (alphabets.length > 0) {
    highest_alphabet = [alphabets.reduce((a, b) => (a > b ? a : b))];
  }

  const user_id = "john_doe_17091999";  // You can change this
  const email = "john@xyz.com";         // You can change this
  const roll_number = "ABCD123";        // You can change this

  const response = {
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_alphabet
  };

  return NextResponse.json(response);
}

// GET method
export async function GET() {
  const response = {
    operation_code: 1
  };
  return NextResponse.json(response);
}
