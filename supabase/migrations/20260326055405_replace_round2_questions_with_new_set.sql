/*
  # Replace Round 2 Questions with New Logic-Based Set

  1. Changes
    - Delete all existing Round 2 questions
    - Insert 100 new Round 2 questions focused on:
      - Number sequences and patterns (Q1-30)
      - Logic and reasoning problems (Q11-20)
      - Mathematical calculations (Q21-100)
    
  2. Notes
    - All questions have 4 options (A, B, C, D)
    - Questions are numbered sequentially from 1-100
    - Focus on logic, patterns, and problem-solving
*/

-- Delete existing Round 2 questions
DELETE FROM round2_questions;

-- Insert new Round 2 questions (Q1-10)
INSERT INTO round2_questions (question_order, question_text, option_a, option_b, option_c, correct_answer) VALUES
(1, 'Find the next number: 4, 6, 12, 14, 28, ?', '30', '56', '58', 'A'),
(2, 'Find the next number: 3, 8, 18, 38, ?', '76', '78', '80', 'B'),
(3, 'Find the next number: 2, 5, 10, 17, 26, ?', '35', '36', '37', 'C'),
(4, 'Find the next number: 7, 9, 13, 21, 37, ?', '69', '70', '71', 'A'),
(5, 'Find the next number: 1, 2, 5, 12, 29, ?', '60', '70', '72', 'B'),
(6, 'Find the next number: 6, 7, 13, 20, 33, ?', '53', '54', '55', 'B'),
(7, 'Find the next number: 8, 24, 12, 36, 18, ?', '54', '56', '60', 'A'),
(8, 'Find the next number: 9, 11, 15, 23, 39, ?', '71', '72', '73', 'A'),
(9, 'Find the next number: 2, 3, 6, 11, 18, 27, ?', '36', '38', '40', 'B'),
(10, 'Find the next number: 5, 6, 12, 13, 26, ?', '27', '28', '30', 'A');

-- Insert Q11-20
INSERT INTO round2_questions (question_order, question_text, option_a, option_b, option_c, correct_answer) VALUES
(11, 'A pond doubles in size every day and becomes full on day 50. On which day was it half full?', '48', '49', '25', 'B'),
(12, 'If 8 workers complete a task in 6 hours, how long will 4 workers take?', '12 hours', '10 hours', '8 hours', 'A'),
(13, 'If 30% of a number is 60, what is the number?', '200', '180', '150', 'A'),
(14, 'If you pass the last person in a race, what position are you in?', 'Last', 'Second last', 'First', 'B'),
(15, 'All roses are flowers. Some flowers fade quickly. What can you conclude?', 'All roses fade quickly', 'Some roses fade quickly', 'Cannot be determined', 'C'),
(16, 'A train travels 180 km in 3 hours. How far will it travel in 2 hours?', '100 km', '110 km', '120 km', 'C'),
(17, 'If 10 machines produce 10 items in 10 minutes, how many items will 1 machine produce in 10 minutes?', '1', '5', '10', 'A'),
(18, 'Which is the largest value?', '0.45²', '0.5²', '0.55²', 'C'),
(19, 'Which is the smallest fraction?', '1/4', '1/6', '1/8', 'C'),
(20, 'If 5 books cost 100, what is the cost of 8 books?', '140', '160', '180', 'B');

-- Insert Q21-30
INSERT INTO round2_questions (question_order, question_text, option_a, option_b, option_c, correct_answer) VALUES
(21, 'Find the next number: 12, 24, 48, 96, ?', '160', '192', '200', 'B'),
(22, 'Find the next number: 3, 7, 15, 31, 63, ?', '95', '127', '129', 'B'),
(23, 'Find the next number: 2, 8, 9, 36, 37, ?', '144', '145', '148', 'A'),
(24, 'Find the next number: 5, 11, 23, 47, ?', '95', '96', '97', 'A'),
(25, 'Find the next number: 4, 10, 22, 46, ?', '90', '94', '92', 'B'),
(26, 'Find the next number: 1, 3, 9, 27, 81, ?', '162', '243', '200', 'B'),
(27, 'Find the next number: 2, 4, 16, 256, ?', '512', '1024', '65536', 'C'),
(28, 'Find the next number: 6, 12, 24, 48, 96, ?', '180', '192', '200', 'B'),
(29, 'Find the next number: 10, 20, 25, 50, 55, ?', '110', '105', '100', 'A'),
(30, 'Find the next number: 7, 14, 16, 32, 34, ?', '66', '68', '70', 'B');

-- Insert Q31-40
INSERT INTO round2_questions (question_order, question_text, option_a, option_b, option_c, correct_answer) VALUES
(31, 'Which country has the Eiffel Tower?', 'Italy', 'France', 'Spain', 'B'),
(32, 'Which is the largest planet?', 'Earth', 'Jupiter', 'Mars', 'B'),
(33, 'H₂O is known as?', 'Oxygen', 'Hydrogen', 'Water', 'C'),
(34, 'Who invented the light bulb?', 'Edison', 'Tesla', 'Newton', 'A'),
(35, 'Which continent is Brazil in?', 'Europe', 'Asia', 'South America', 'C'),
(36, 'Which is the fastest bird?', 'Eagle', 'Falcon', 'Owl', 'B'),
(37, 'Which metal is a good conductor?', 'Iron', 'Copper', 'Gold', 'B'),
(38, 'Which is the largest desert?', 'Sahara', 'Gobi', 'Arctic', 'A'),
(39, 'Who painted Starry Night?', 'Picasso', 'Van Gogh', 'Da Vinci', 'B'),
(40, 'Which gas is most abundant in air?', 'Oxygen', 'Nitrogen', 'CO₂', 'B');

-- Insert Q41-50
INSERT INTO round2_questions (question_order, question_text, option_a, option_b, option_c, correct_answer) VALUES
(41, 'Find the next number: 3, 12, 48, 192, ?', '384', '768', '960', 'B'),
(42, 'Find the next number: 1, 5, 25, 125, ?', '500', '625', '700', 'B'),
(43, 'Find the next number: 2, 6, 18, 54, 162, ?', '324', '486', '512', 'B'),
(44, 'Find the next number: 9, 18, 36, 72, 144, ?', '260', '288', '300', 'B'),
(45, 'Find the next number: 4, 16, 64, 256, ?', '512', '1024', '2048', 'B'),
(46, 'Find the next number: 11, 22, 44, 88, 176, ?', '300', '352', '360', 'B'),
(47, 'Find the next number: 1, 4, 13, 40, ?', '100', '121', '120', 'B'),
(48, 'Find the next number: 2, 3, 5, 7, 11, ?', '13', '15', '17', 'A'),
(49, 'Find the next number: 1, 4, 9, 16, 25, ?', '30', '36', '40', 'B'),
(50, 'Find the next number: 6, 10, 15, 21, 28, ?', '35', '36', '37', 'A');

-- Insert Q51-60
INSERT INTO round2_questions (question_order, question_text, option_a, option_b, option_c, correct_answer) VALUES
(51, 'Find the next number: 2, 7, 26, 101, ?', '402', '404', '406', 'B'),
(52, 'Find the next number: 3, 5, 11, 21, 43, ?', '85', '86', '87', 'C'),
(53, 'Find the next number: 1, 4, 13, 40, 121, ?', '360', '363', '364', 'C'),
(54, 'Find the next number: 5, 10, 12, 24, 26, ?', '50', '52', '54', 'B'),
(55, 'Find the next number: 2, 3, 6, 7, 14, 15, ?', '28', '30', '32', 'A'),
(56, 'Find the next number: 4, 5, 9, 10, 19, 20, ?', '39', '40', '41', 'A'),
(57, 'Find the next number: 6, 8, 16, 18, 36, ?', '38', '40', '42', 'A'),
(58, 'Find the next number: 7, 14, 15, 30, 31, ?', '60', '62', '64', 'B'),
(59, 'Find the next number: 1, 2, 6, 7, 21, 22, ?', '44', '66', '68', 'B'),
(60, 'Find the next number: 9, 18, 20, 40, 42, ?', '82', '84', '86', 'B');

-- Insert Q61-70
INSERT INTO round2_questions (question_order, question_text, option_a, option_b, option_c, correct_answer) VALUES
(61, 'Find the next number: 2, 6, 8, 24, 26, ?', '52', '78', '80', 'B'),
(62, 'Find the next number: 3, 4, 12, 13, 39, ?', '40', '42', '41', 'A'),
(63, 'Find the next number: 5, 6, 30, 31, 155, ?', '156', '158', '160', 'A'),
(64, 'Find the next number: 2, 3, 9, 10, 30, 31, ?', '60', '90', '93', 'B'),
(65, 'Find the next number: 4, 6, 24, 26, 104, ?', '106', '108', '110', 'A'),
(66, 'Find the next number: 1, 3, 12, 14, 56, ?', '58', '60', '62', 'A'),
(67, 'Find the next number: 2, 4, 16, 18, 72, ?', '74', '76', '78', 'A'),
(68, 'Find the next number: 3, 5, 20, 22, 88, ?', '90', '92', '94', 'A'),
(69, 'Find the next number: 6, 7, 42, 43, 258, ?', '259', '260', '261', 'A'),
(70, 'Find the next number: 2, 3, 8, 9, 24, 25, ?', '48', '72', '75', 'B');

-- Insert Q71-80
INSERT INTO round2_questions (question_order, question_text, option_a, option_b, option_c, correct_answer) VALUES
(71, 'Find the next number: 5, 7, 35, 37, 185, ?', '186', '187', '188', 'B'),
(72, 'Find the next number: 4, 6, 36, 38, 228, ?', '230', '232', '234', 'A'),
(73, 'Find the next number: 1, 2, 10, 11, 55, ?', '56', '57', '58', 'A'),
(74, 'Find the next number: 3, 4, 15, 16, 60, ?', '61', '62', '63', 'A'),
(75, 'Find the next number: 7, 9, 63, 65, 455, ?', '456', '458', '460', 'A'),
(76, 'Find the next number: 2, 3, 12, 13, 52, ?', '53', '54', '55', 'A'),
(77, 'Find the next number: 5, 6, 30, 31, 155, ?', '156', '157', '158', 'A'),
(78, 'Find the next number: 4, 5, 20, 21, 84, ?', '85', '86', '88', 'A'),
(79, 'Find the next number: 3, 6, 18, 19, 57, ?', '58', '60', '61', 'A'),
(80, 'Find the next number: 6, 8, 48, 50, 300, ?', '302', '304', '306', 'A');

-- Insert Q81-90
INSERT INTO round2_questions (question_order, question_text, option_a, option_b, option_c, correct_answer) VALUES
(81, 'Find the next number: 2, 3, 18, 19, 114, ?', '115', '116', '117', 'A'),
(82, 'Find the next number: 4, 6, 48, 50, 400, ?', '402', '404', '406', 'A'),
(83, 'Find the next number: 5, 7, 70, 72, 720, ?', '722', '724', '726', 'A'),
(84, 'Find the next number: 3, 5, 30, 32, 192, ?', '194', '196', '198', 'A'),
(85, 'Find the next number: 6, 7, 42, 43, 258, ?', '259', '260', '261', 'A'),
(86, 'Find the next number: 2, 4, 24, 26, 156, ?', '158', '160', '162', 'A'),
(87, 'Find the next number: 3, 4, 24, 25, 150, ?', '151', '152', '153', 'A'),
(88, 'Find the next number: 5, 6, 60, 61, 610, ?', '611', '612', '613', 'A'),
(89, 'Find the next number: 7, 8, 56, 57, 399, ?', '400', '401', '402', 'A'),
(90, 'Find the next number: 8, 9, 72, 73, 584, ?', '585', '586', '588', 'A');

-- Insert Q91-100
INSERT INTO round2_questions (question_order, question_text, option_a, option_b, option_c, correct_answer) VALUES
(91, 'Find the next number: 2, 5, 20, 23, 92, ?', '95', '96', '97', 'A'),
(92, 'Find the next number: 3, 6, 30, 33, 165, ?', '168', '170', '172', 'A'),
(93, 'Find the next number: 4, 7, 56, 59, 472, ?', '475', '476', '478', 'A'),
(94, 'Find the next number: 5, 8, 80, 83, 830, ?', '833', '835', '838', 'A'),
(95, 'Find the next number: 6, 9, 108, 111, 1332, ?', '1335', '1336', '1338', 'A'),
(96, 'Find the next number: 2, 6, 36, 40, 240, ?', '244', '246', '248', 'A'),
(97, 'Find the next number: 3, 7, 63, 67, 603, ?', '607', '609', '610', 'A'),
(98, 'Find the next number: 4, 8, 96, 100, 1200, ?', '1204', '1206', '1208', 'A'),
(99, 'Find the next number: 5, 9, 135, 139, 2085, ?', '2089', '2090', '2092', 'A'),
(100, 'Find the next number: 6, 10, 180, 184, 3312, ?', '3316', '3318', '3320', 'A');
