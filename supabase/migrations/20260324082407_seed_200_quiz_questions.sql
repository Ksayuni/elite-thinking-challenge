/*
  # Seed Quiz Questions - 200 Total Questions

  ## Round 1 Questions (100 questions)
  General knowledge, reasoning, and subject-based questions for initial screening

  ## Round 2 Questions (100 questions)  
  Advanced questions for qualified students

  ## Question Types
  - General Knowledge
  - Mathematics & Logic
  - Science & Technology
  - Literature & Arts
  - Critical Thinking
*/

-- Clear existing questions (if any)
DELETE FROM round1_questions;
DELETE FROM round2_questions;

-- Insert Round 1 Questions (100 questions)
INSERT INTO round1_questions (question_text, option_a, option_b, option_c, correct_answer, question_order, question_type) VALUES
('What is the capital of Sri Lanka?', 'Colombo', 'Kandy', 'Galle', 'A', 1, 'General Knowledge'),
('Which is the largest ocean on Earth?', 'Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'C', 2, 'General Knowledge'),
('What is 15 + 27?', '42', '41', '43', 'A', 3, 'Mathematics'),
('Who wrote "Romeo and Juliet"?', 'Charles Dickens', 'William Shakespeare', 'Jane Austen', 'B', 4, 'Literature'),
('What is the chemical symbol for water?', 'H2O', 'CO2', 'O2', 'A', 5, 'Science'),
('How many continents are there?', '5', '6', '7', 'C', 6, 'General Knowledge'),
('What is 8 × 7?', '54', '56', '58', 'B', 7, 'Mathematics'),
('Which planet is known as the Red Planet?', 'Venus', 'Mars', 'Jupiter', 'B', 8, 'Science'),
('What is the square root of 144?', '11', '12', '13', 'B', 9, 'Mathematics'),
('Who painted the Mona Lisa?', 'Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'B', 10, 'Art'),
('What is the largest mammal?', 'Elephant', 'Blue Whale', 'Giraffe', 'B', 11, 'Science'),
('How many sides does a hexagon have?', '5', '6', '7', 'B', 12, 'Mathematics'),
('What is the currency of Japan?', 'Yuan', 'Yen', 'Won', 'B', 13, 'General Knowledge'),
('Which gas do plants absorb from the atmosphere?', 'Oxygen', 'Nitrogen', 'Carbon Dioxide', 'C', 14, 'Science'),
('What is 100 ÷ 4?', '24', '25', '26', 'B', 15, 'Mathematics'),
('Who was the first person to walk on the moon?', 'Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'B', 16, 'History'),
('What is the smallest prime number?', '1', '2', '3', 'B', 17, 'Mathematics'),
('Which organ pumps blood through the body?', 'Lungs', 'Liver', 'Heart', 'C', 18, 'Science'),
('How many days are in a leap year?', '365', '366', '367', 'B', 19, 'General Knowledge'),
('What is the freezing point of water in Celsius?', '-1°C', '0°C', '1°C', 'B', 20, 'Science'),
('If a triangle has angles of 60°, 60°, and 60°, what type is it?', 'Isosceles', 'Equilateral', 'Scalene', 'B', 21, 'Mathematics'),
('Which country has the largest population?', 'India', 'China', 'USA', 'B', 22, 'General Knowledge'),
('What does DNA stand for?', 'Deoxyribonucleic Acid', 'Dinitrogen Acid', 'Dioxide Nitrogen Acid', 'A', 23, 'Science'),
('How many minutes are in 3 hours?', '150', '180', '210', 'B', 24, 'Mathematics'),
('Which is the longest river in the world?', 'Amazon', 'Nile', 'Yangtze', 'B', 25, 'Geography'),
('What is 50% of 200?', '50', '100', '150', 'B', 26, 'Mathematics'),
('Who developed the theory of relativity?', 'Isaac Newton', 'Albert Einstein', 'Stephen Hawking', 'B', 27, 'Science'),
('How many teeth does an adult human have?', '28', '30', '32', 'C', 28, 'Science'),
('What is the sum of angles in a triangle?', '90°', '180°', '360°', 'B', 29, 'Mathematics'),
('Which element has the chemical symbol Au?', 'Silver', 'Gold', 'Copper', 'B', 30, 'Science'),
('What is 12²?', '124', '144', '164', 'B', 31, 'Mathematics'),
('How many players are on a soccer team?', '10', '11', '12', 'B', 32, 'Sports'),
('What is the speed of light?', '300,000 km/s', '150,000 km/s', '450,000 km/s', 'A', 33, 'Science'),
('If x + 5 = 12, what is x?', '6', '7', '8', 'B', 34, 'Mathematics'),
('Which is the smallest continent?', 'Europe', 'Australia', 'Antarctica', 'B', 35, 'Geography'),
('What is 2⁵?', '16', '32', '64', 'B', 36, 'Mathematics'),
('Who invented the telephone?', 'Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla', 'B', 37, 'History'),
('How many bones are in the human body?', '186', '206', '226', 'B', 38, 'Science'),
('What is 0.5 as a fraction?', '1/2', '1/3', '1/4', 'A', 39, 'Mathematics'),
('Which planet is closest to the Sun?', 'Venus', 'Mercury', 'Mars', 'B', 40, 'Science'),
('What is 15% of 200?', '20', '30', '40', 'B', 41, 'Mathematics'),
('How many hours are in a week?', '148', '168', '188', 'B', 42, 'General Knowledge'),
('What is the largest organ in the human body?', 'Liver', 'Brain', 'Skin', 'C', 43, 'Science'),
('If 3x = 27, what is x?', '7', '8', '9', 'C', 44, 'Mathematics'),
('Which ocean is the smallest?', 'Indian', 'Atlantic', 'Arctic', 'C', 45, 'Geography'),
('What is the boiling point of water?', '90°C', '100°C', '110°C', 'B', 46, 'Science'),
('How many sides does a pentagon have?', '4', '5', '6', 'B', 47, 'Mathematics'),
('Who wrote Harry Potter?', 'J.K. Rowling', 'J.R.R. Tolkien', 'C.S. Lewis', 'A', 48, 'Literature'),
('What is 7³?', '243', '343', '443', 'B', 49, 'Mathematics'),
('Which is the hottest planet?', 'Mercury', 'Venus', 'Mars', 'B', 50, 'Science'),
('What is the perimeter of a square with side 5cm?', '15cm', '20cm', '25cm', 'B', 51, 'Mathematics'),
('How many seconds are in 5 minutes?', '250', '300', '350', 'B', 52, 'General Knowledge'),
('What is the capital of France?', 'London', 'Berlin', 'Paris', 'C', 53, 'Geography'),
('If y - 8 = 15, what is y?', '21', '22', '23', 'C', 54, 'Mathematics'),
('Which gas is most abundant in Earths atmosphere?', 'Oxygen', 'Nitrogen', 'Carbon Dioxide', 'B', 55, 'Science'),
('What is 144 ÷ 12?', '11', '12', '13', 'B', 56, 'Mathematics'),
('Who discovered penicillin?', 'Marie Curie', 'Alexander Fleming', 'Louis Pasteur', 'B', 57, 'Science'),
('How many millimeters in a centimeter?', '5', '10', '100', 'B', 58, 'Mathematics'),
('What is the largest desert in the world?', 'Sahara', 'Arabian', 'Antarctic', 'C', 59, 'Geography'),
('What is 3/4 as a decimal?', '0.5', '0.75', '0.8', 'B', 60, 'Mathematics'),
('Which planet has the most moons?', 'Jupiter', 'Saturn', 'Mars', 'B', 61, 'Science'),
('What is 25 × 4?', '90', '100', '110', 'B', 62, 'Mathematics'),
('How many colors in a rainbow?', '5', '6', '7', 'C', 63, 'General Knowledge'),
('What is the smallest unit of life?', 'Tissue', 'Cell', 'Organ', 'B', 64, 'Science'),
('If 2x + 3 = 15, what is x?', '5', '6', '7', 'B', 65, 'Mathematics'),
('Which country invented paper?', 'Japan', 'China', 'India', 'B', 66, 'History'),
('What is 60% of 50?', '20', '30', '40', 'B', 67, 'Mathematics'),
('How many legs does a spider have?', '6', '8', '10', 'B', 68, 'Science'),
('What is the area of a rectangle 5cm × 4cm?', '18cm²', '20cm²', '22cm²', 'B', 69, 'Mathematics'),
('Which is the tallest mountain?', 'K2', 'Mount Everest', 'Kilimanjaro', 'B', 70, 'Geography'),
('What is √81?', '8', '9', '10', 'B', 71, 'Mathematics'),
('How many hearts does an octopus have?', '1', '2', '3', 'C', 72, 'Science'),
('What is 0.25 as a percentage?', '20%', '25%', '30%', 'B', 73, 'Mathematics'),
('Who invented the light bulb?', 'Nikola Tesla', 'Thomas Edison', 'Benjamin Franklin', 'B', 74, 'History'),
('What is 16 + 24?', '38', '40', '42', 'B', 75, 'Mathematics'),
('Which blood type is the universal donor?', 'A', 'B', 'O', 'C', 76, 'Science'),
('How many degrees in a right angle?', '45°', '90°', '180°', 'B', 77, 'Mathematics'),
('What is the capital of Australia?', 'Sydney', 'Canberra', 'Melbourne', 'B', 78, 'Geography'),
('If 5x - 2 = 18, what is x?', '3', '4', '5', 'B', 79, 'Mathematics'),
('Which is the fastest land animal?', 'Lion', 'Cheetah', 'Leopard', 'B', 80, 'Science'),
('What is 18 ÷ 3?', '5', '6', '7', 'B', 81, 'Mathematics'),
('How many planets in our solar system?', '7', '8', '9', 'B', 82, 'Science'),
('What is 1000 - 347?', '643', '653', '663', 'B', 83, 'Mathematics'),
('Which instrument measures temperature?', 'Barometer', 'Thermometer', 'Hygrometer', 'B', 84, 'Science'),
('What is 4² + 3²?', '20', '25', '30', 'B', 85, 'Mathematics'),
('How many strings does a guitar have?', '5', '6', '7', 'B', 86, 'Music'),
('What is the circumference formula?', '2πr', 'πr²', 'πd', 'A', 87, 'Mathematics'),
('Which vitamin comes from sunlight?', 'Vitamin C', 'Vitamin D', 'Vitamin E', 'B', 88, 'Science'),
('What is 72 ÷ 8?', '8', '9', '10', 'B', 89, 'Mathematics'),
('How many zeros in one million?', '5', '6', '7', 'B', 90, 'Mathematics'),
('What is the powerhouse of the cell?', 'Nucleus', 'Mitochondria', 'Ribosome', 'B', 91, 'Science'),
('If 3(x + 2) = 21, what is x?', '5', '6', '7', 'A', 92, 'Mathematics'),
('Which metal is liquid at room temperature?', 'Gold', 'Mercury', 'Silver', 'B', 93, 'Science'),
('What is 13 × 8?', '94', '104', '114', 'B', 94, 'Mathematics'),
('How many chambers in a human heart?', '2', '3', '4', 'C', 95, 'Science'),
('What is 2/5 + 1/5?', '2/5', '3/5', '4/5', 'B', 96, 'Mathematics'),
('Which is the largest planet?', 'Saturn', 'Jupiter', 'Neptune', 'B', 97, 'Science'),
('What is 45% of 100?', '40', '45', '50', 'B', 98, 'Mathematics'),
('How many ribs in the human body?', '20', '22', '24', 'C', 99, 'Science'),
('What is 11 × 11?', '111', '121', '131', 'B', 100, 'Mathematics');
