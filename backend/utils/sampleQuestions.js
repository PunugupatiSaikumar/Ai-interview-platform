// Fallback sample questions when AI APIs are unavailable

const sampleQuestions = {
  coding: {
    easy: [
      {
        question: "**Two Sum**\n\nGiven an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\n**Example:**\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n\n**Constraints:**\n- You may assume that each input would have exactly one solution.\n- You may not use the same element twice.\n\n**Hint:** Think about using a hash map to store values and their indices."
      },
      {
        question: "**Reverse a String**\n\nWrite a function that reverses a string. The input string is given as an array of characters.\n\n**Example:**\nInput: [\"h\",\"e\",\"l\",\"l\",\"o\"]\nOutput: [\"o\",\"l\",\"l\",\"e\",\"h\"]\n\n**Hint:** Use two pointers approach - one at the start and one at the end."
      }
    ],
    medium: [
      {
        question: "**Longest Substring Without Repeating Characters**\n\nGiven a string `s`, find the length of the longest substring without repeating characters.\n\n**Example:**\nInput: s = \"abcabcbb\"\nOutput: 3\nExplanation: The answer is \"abc\", with the length of 3.\n\n**Constraints:**\n- 0 <= s.length <= 5 * 10^4\n- s consists of English letters, digits, symbols and spaces.\n\n**Hint:** Use a sliding window technique with a hash set to track characters."
      },
      {
        question: "**Container With Most Water**\n\nYou are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`th line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\n**Example:**\nInput: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49\n\n**Hint:** Use two pointers starting from both ends and move the pointer with smaller height."
      }
    ],
    hard: [
      {
        question: "**Trapping Rain Water**\n\nGiven `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.\n\n**Example:**\nInput: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6\n\n**Hint:** Think about using two arrays to track the maximum height from left and right, or use a two-pointer approach."
      }
    ]
  },
  behavioral: [
    {
      question: "**Tell me about yourself.**\n\n**What the interviewer is looking for:**\n- Clear, concise summary of your background\n- Relevant experience and skills\n- Why you're interested in this role\n- Professional but personable\n\n**Key points to cover:**\n1. Current role/responsibilities (1-2 sentences)\n2. Relevant experience and achievements\n3. Why you're interested in this position\n4. What you can bring to the team\n\n**Tip:** Keep it to 1-2 minutes, focus on what's relevant to the role."
    },
    {
      question: "**Tell me about a time you faced a difficult challenge.**\n\n**What the interviewer is looking for:**\n- Problem-solving skills\n- Resilience and persistence\n- How you handle pressure\n- Learning from challenges\n\n**Use the STAR method:**\n- **Situation:** Set the context\n- **Task:** What you needed to accomplish\n- **Action:** What you did (focus on YOUR actions)\n- **Result:** The outcome and what you learned"
    },
    {
      question: "**Why do you want to work here?**\n\n**What the interviewer is looking for:**\n- Genuine interest in the company\n- Research about the company\n- Alignment with company values\n- Long-term interest\n\n**Key points to cover:**\n1. Specific things about the company that excite you\n2. How your skills align with their needs\n3. Growth opportunities\n4. Company culture fit"
    }
  ]
};

function getSampleQuestion(type, category, difficulty = 'medium') {
  if (type === 'behavioral') {
    const questions = sampleQuestions.behavioral;
    return questions[Math.floor(Math.random() * questions.length)].question;
  } else {
    const questions = sampleQuestions.coding[difficulty] || sampleQuestions.coding.medium;
    return questions[Math.floor(Math.random() * questions.length)].question;
  }
}

module.exports = { getSampleQuestion, sampleQuestions };

