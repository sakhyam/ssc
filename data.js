// Questions database organized by topic
const questionsData = {
    // Reasoning Topics
    'Analogy': [
        {
            question: 'Book is to Reading as Fork is to:',
            options: ['Eating', 'Writing', 'Cooking', 'Cutting'],
            correct: 0,
            explanation: 'A book is used for reading, similarly a fork is used for eating.'
        },
        {
            question: 'Doctor is to Hospital as Teacher is to:',
            options: ['School', 'Clinic', 'Library', 'Office'],
            correct: 0,
            explanation: 'A doctor works in a hospital, similarly a teacher works in a school.'
        },
        {
            question: 'Pen is to Write as Knife is to:',
            options: ['Cut', 'Draw', 'Paint', 'Eat'],
            correct: 0,
            explanation: 'A pen is used to write, similarly a knife is used to cut.'
        }
    ],
    'Series': [
        {
            question: 'What comes next in the series: 2, 4, 8, 16, ?',
            options: ['24', '32', '28', '30'],
            correct: 1,
            explanation: 'Each number is multiplied by 2: 2×2=4, 4×2=8, 8×2=16, 16×2=32'
        },
        {
            question: 'Complete the series: A, C, E, G, ?',
            options: ['H', 'I', 'J', 'K'],
            correct: 1,
            explanation: 'The series follows odd positions: A(1), C(3), E(5), G(7), I(9)'
        },
        {
            question: 'What is the next number: 5, 10, 20, 40, ?',
            options: ['60', '80', '70', '90'],
            correct: 1,
            explanation: 'Each number is doubled: 5×2=10, 10×2=20, 20×2=40, 40×2=80'
        }
    ],
    'Coding-Decoding': [
        {
            question: 'If CAT is coded as 3120, how is DOG coded?',
            options: ['4157', '4156', '4158', '4159'],
            correct: 0,
            explanation: 'C=3, A=1, T=20. D=4, O=15, G=7. So DOG = 4157'
        },
        {
            question: 'If APPLE is coded as 50, how is ORANGE coded?',
            options: ['60', '70', '65', '75'],
            correct: 0,
            explanation: 'APPLE: A(1)+P(16)+P(16)+L(12)+E(5) = 50. ORANGE: O(15)+R(18)+A(1)+N(14)+G(7)+E(5) = 60'
        }
    ],
    'Blood Relation': [
        {
            question: 'A is the brother of B. C is the father of A. D is the brother of E. E is the daughter of B. How is D related to C?',
            options: ['Son', 'Grandson', 'Nephew', 'Brother'],
            correct: 1,
            explanation: 'A is son of C. B is sibling of A. E is daughter of B. D is brother of E. So D is grandson of C.'
        },
        {
            question: 'Pointing to a man, a woman said, "His mother is the only daughter of my mother." How is the woman related to the man?',
            options: ['Mother', 'Sister', 'Aunt', 'Daughter'],
            correct: 0,
            explanation: 'Only daughter of woman\'s mother is the woman herself. So she is the man\'s mother.'
        }
    ],
    'Direction': [
        {
            question: 'A person walks 5 km North, then 3 km East, then 5 km South. In which direction is he from the starting point?',
            options: ['North', 'East', 'South', 'West'],
            correct: 1,
            explanation: 'Net displacement: 5N - 5S = 0 (North-South), 3E. So he is 3 km East of starting point.'
        },
        {
            question: 'If you are facing North and turn right, then right again, then left, which direction are you facing?',
            options: ['North', 'East', 'South', 'West'],
            correct: 1,
            explanation: 'North → Right (East) → Right (South) → Left (East)'
        }
    ],
    'Venn Diagram': [
        {
            question: 'In a class of 50 students, 30 play cricket, 25 play football, and 10 play both. How many play neither?',
            options: ['5', '10', '15', '20'],
            correct: 0,
            explanation: 'Only cricket: 30-10=20, Only football: 25-10=15, Both: 10. Total playing: 20+15+10=45. Neither: 50-45=5'
        }
    ],
    'Puzzle': [
        {
            question: 'Five friends A, B, C, D, E are sitting in a row. A is not at either end. B is to the right of A. C is between A and D. Who is at the left end?',
            options: ['B', 'C', 'D', 'E'],
            correct: 3,
            explanation: 'Arrangement: E, A, C, D, B (left to right). So E is at left end.'
        }
    ],
    'Non-verbal': [
        {
            question: 'Which figure is the mirror image of the given figure?',
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correct: 1,
            explanation: 'Mirror images reverse left and right sides.'
        }
    ],
    // General Knowledge Topics
    'History': [
        {
            question: 'Who was the first Governor-General of independent India?',
            options: ['Lord Mountbatten', 'C. Rajagopalachari', 'Dr. Rajendra Prasad', 'Jawaharlal Nehru'],
            correct: 0,
            explanation: 'Lord Mountbatten was the first Governor-General of independent India (1947-1948).'
        },
        {
            question: 'The Battle of Plassey was fought in which year?',
            options: ['1757', '1764', '1857', '1947'],
            correct: 0,
            explanation: 'The Battle of Plassey was fought on June 23, 1757, between the British East India Company and the Nawab of Bengal.'
        },
        {
            question: 'Who wrote "Discovery of India"?',
            options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'Rabindranath Tagore', 'Subhash Chandra Bose'],
            correct: 1,
            explanation: 'Jawaharlal Nehru wrote "Discovery of India" while imprisoned in Ahmednagar Fort.'
        }
    ],
    'Geography': [
        {
            question: 'Which is the longest river in India?',
            options: ['Yamuna', 'Ganga', 'Godavari', 'Brahmaputra'],
            correct: 1,
            explanation: 'The Ganga (Ganges) is the longest river in India, flowing for about 2,525 km.'
        },
        {
            question: 'Which state has the longest coastline in India?',
            options: ['Maharashtra', 'Tamil Nadu', 'Gujarat', 'Kerala'],
            correct: 2,
            explanation: 'Gujarat has the longest coastline in India, approximately 1,600 km.'
        },
        {
            question: 'The Tropic of Cancer passes through how many Indian states?',
            options: ['6', '7', '8', '9'],
            correct: 2,
            explanation: 'Tropic of Cancer passes through 8 Indian states: Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram.'
        }
    ],
    'Polity': [
        {
            question: 'How many articles are there in the Indian Constitution?',
            options: ['395', '448', '470', '485'],
            correct: 1,
            explanation: 'The Indian Constitution originally had 395 articles, but currently has 448 articles after amendments.'
        },
        {
            question: 'Who is the guardian of the Indian Constitution?',
            options: ['President', 'Prime Minister', 'Supreme Court', 'Parliament'],
            correct: 2,
            explanation: 'The Supreme Court is considered the guardian of the Indian Constitution.'
        },
        {
            question: 'The concept of Fundamental Duties was added by which amendment?',
            options: ['42nd Amendment', '44th Amendment', '73rd Amendment', '86th Amendment'],
            correct: 0,
            explanation: 'The 42nd Amendment Act of 1976 added Fundamental Duties to the Constitution.'
        }
    ],
    'Economy': [
        {
            question: 'What is the full form of GDP?',
            options: ['Gross Domestic Product', 'Gross Development Product', 'General Domestic Product', 'General Development Product'],
            correct: 0,
            explanation: 'GDP stands for Gross Domestic Product, the total value of goods and services produced in a country.'
        },
        {
            question: 'Which is the largest source of revenue for the Indian government?',
            options: ['Income Tax', 'GST', 'Corporate Tax', 'Customs Duty'],
            correct: 1,
            explanation: 'GST (Goods and Services Tax) is the largest source of revenue for the Indian government.'
        }
    ],
    'Science': [
        {
            question: 'What is the chemical formula of water?',
            options: ['H2O', 'H2O2', 'CO2', 'NaCl'],
            correct: 0,
            explanation: 'Water is composed of two hydrogen atoms and one oxygen atom, hence H2O.'
        },
        {
            question: 'Which gas is most abundant in Earth\'s atmosphere?',
            options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'],
            correct: 2,
            explanation: 'Nitrogen makes up about 78% of Earth\'s atmosphere, making it the most abundant gas.'
        },
        {
            question: 'What is the speed of light in vacuum?',
            options: ['3 × 10^8 m/s', '3 × 10^6 m/s', '3 × 10^10 m/s', '3 × 10^5 m/s'],
            correct: 0,
            explanation: 'The speed of light in vacuum is approximately 3 × 10^8 meters per second.'
        }
    ],
    'Current Affairs': [
        {
            question: 'Which country hosted the 2024 Olympics?',
            options: ['Japan', 'France', 'China', 'USA'],
            correct: 1,
            explanation: 'France (Paris) hosted the 2024 Summer Olympics.'
        },
        {
            question: 'What is the theme of World Environment Day 2024?',
            options: ['Beat Plastic Pollution', 'Ecosystem Restoration', 'Only One Earth', 'Land Restoration'],
            correct: 1,
            explanation: 'The theme for World Environment Day 2024 was "Ecosystem Restoration".'
        }
    ],
    'Static GK': [
        {
            question: 'How many Union Territories are there in India?',
            options: ['7', '8', '9', '10'],
            correct: 1,
            explanation: 'India has 8 Union Territories: Andaman and Nicobar Islands, Chandigarh, Dadra and Nagar Haveli and Daman and Diu, Delhi, Jammu and Kashmir, Ladakh, Lakshadweep, and Puducherry.'
        },
        {
            question: 'Which is the smallest state in India by area?',
            options: ['Goa', 'Sikkim', 'Tripura', 'Mizoram'],
            correct: 0,
            explanation: 'Goa is the smallest state in India by area, covering approximately 3,702 square kilometers.'
        }
    ],
    // Mathematics Topics
    'Percentage': [
        {
            question: 'If 20% of a number is 50, what is the number?',
            options: ['200', '250', '300', '350'],
            correct: 1,
            explanation: '20% of x = 50, so x = 50 × 100/20 = 250'
        },
        {
            question: 'A number is increased by 25% and then decreased by 20%. What is the net change?',
            options: ['5% increase', '5% decrease', 'No change', '10% increase'],
            correct: 2,
            explanation: 'Let number be 100. After 25% increase: 125. After 20% decrease: 125 × 0.8 = 100. Net change: 0%'
        }
    ],
    'Profit & Loss': [
        {
            question: 'A shopkeeper buys an article for ₹500 and sells it for ₹600. What is his profit percentage?',
            options: ['15%', '20%', '25%', '30%'],
            correct: 1,
            explanation: 'Profit = ₹600 - ₹500 = ₹100. Profit% = (100/500) × 100 = 20%'
        },
        {
            question: 'If the cost price of 20 articles equals the selling price of 15 articles, what is the profit percentage?',
            options: ['25%', '33.33%', '40%', '50%'],
            correct: 1,
            explanation: 'CP of 20 = SP of 15. Let CP of 1 = ₹1, then CP of 20 = ₹20 = SP of 15. SP of 1 = 20/15 = 4/3. Profit% = ((4/3 - 1)/1) × 100 = 33.33%'
        }
    ],
    'Average': [
        {
            question: 'The average of 5 numbers is 20. If one number is excluded, the average becomes 18. What is the excluded number?',
            options: ['24', '26', '28', '30'],
            correct: 2,
            explanation: 'Sum of 5 numbers = 5 × 20 = 100. Sum of 4 numbers = 4 × 18 = 72. Excluded number = 100 - 72 = 28'
        }
    ],
    'Ratio & Proportion': [
        {
            question: 'If A:B = 2:3 and B:C = 4:5, what is A:C?',
            options: ['8:15', '2:5', '4:5', '6:5'],
            correct: 0,
            explanation: 'A:B = 2:3 = 8:12, B:C = 4:5 = 12:15. Therefore A:C = 8:15'
        }
    ],
    'Simple & Compound Interest': [
        {
            question: 'What is the simple interest on ₹10,000 at 5% per annum for 2 years?',
            options: ['₹500', '₹1,000', '₹1,500', '₹2,000'],
            correct: 1,
            explanation: 'SI = (P × R × T)/100 = (10000 × 5 × 2)/100 = ₹1,000'
        },
        {
            question: 'What is the compound interest on ₹10,000 at 10% per annum for 2 years?',
            options: ['₹2,000', '₹2,100', '₹2,200', '₹2,300'],
            correct: 1,
            explanation: 'A = P(1 + R/100)^T = 10000(1.1)^2 = ₹12,100. CI = ₹12,100 - ₹10,000 = ₹2,100'
        }
    ],
    'Time & Work': [
        {
            question: 'A can complete a work in 10 days and B can complete it in 15 days. In how many days will they complete it together?',
            options: ['5 days', '6 days', '7 days', '8 days'],
            correct: 1,
            explanation: 'A\'s 1 day work = 1/10, B\'s 1 day work = 1/15. Together: 1/10 + 1/15 = 5/30 = 1/6. Time = 6 days'
        }
    ],
    'Time, Speed & Distance': [
        {
            question: 'A train travels 120 km in 2 hours. What is its speed?',
            options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'],
            correct: 1,
            explanation: 'Speed = Distance/Time = 120/2 = 60 km/h'
        },
        {
            question: 'If a person covers 40 km in 1 hour, how much distance will he cover in 3 hours?',
            options: ['100 km', '120 km', '140 km', '160 km'],
            correct: 1,
            explanation: 'Distance = Speed × Time = 40 × 3 = 120 km'
        }
    ],
    'Mensuration': [
        {
            question: 'What is the area of a rectangle with length 10 cm and breadth 5 cm?',
            options: ['40 cm²', '45 cm²', '50 cm²', '55 cm²'],
            correct: 2,
            explanation: 'Area of rectangle = Length × Breadth = 10 × 5 = 50 cm²'
        },
        {
            question: 'What is the circumference of a circle with radius 7 cm? (π = 22/7)',
            options: ['44 cm', '48 cm', '52 cm', '56 cm'],
            correct: 0,
            explanation: 'Circumference = 2πr = 2 × (22/7) × 7 = 44 cm'
        }
    ],
    'Algebra': [
        {
            question: 'If x + 5 = 12, what is the value of x?',
            options: ['5', '6', '7', '8'],
            correct: 2,
            explanation: 'x + 5 = 12, therefore x = 12 - 5 = 7'
        },
        {
            question: 'Solve: 2x - 3 = 7',
            options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
            correct: 2,
            explanation: '2x - 3 = 7, so 2x = 10, therefore x = 5'
        }
    ],
    'Data Interpretation': [
        {
            question: 'In a class of 50 students, 30 like Math, 25 like Science, and 15 like both. How many like only Math?',
            options: ['10', '15', '20', '25'],
            correct: 1,
            explanation: 'Only Math = Total Math - Both = 30 - 15 = 15'
        }
    ],
    // English Topics
    'Vocabulary': [
        {
            question: 'What is the synonym of "Benevolent"?',
            options: ['Cruel', 'Kind', 'Angry', 'Sad'],
            correct: 1,
            explanation: 'Benevolent means kind, generous, and well-meaning.'
        },
        {
            question: 'What is the antonym of "Transparent"?',
            options: ['Clear', 'Opaque', 'Bright', 'Shiny'],
            correct: 1,
            explanation: 'Transparent means see-through, so its antonym is opaque (not see-through).'
        }
    ],
    'Error Spotting': [
        {
            question: 'Identify the error: "Neither of the students were present."',
            options: ['No error', 'were', 'students', 'present'],
            correct: 1,
            explanation: 'With "neither", use singular verb "was" instead of "were". Correct: "Neither of the students was present."'
        }
    ],
    'Fill in the Blanks': [
        {
            question: 'Fill in the blank: "She is _____ honest person."',
            options: ['a', 'an', 'the', 'no article'],
            correct: 1,
            explanation: 'Use "an" before words starting with a vowel sound. "Honest" starts with a vowel sound (/ɒ/).'
        }
    ],
    'Sentence Improvement': [
        {
            question: 'Improve: "He don\'t like coffee."',
            options: ['He doesn\'t like coffee.', 'He didn\'t like coffee.', 'He won\'t like coffee.', 'No improvement'],
            correct: 0,
            explanation: 'With third person singular "he", use "doesn\'t" not "don\'t".'
        }
    ],
    'Active-Passive': [
        {
            question: 'Convert to passive: "The teacher teaches the students."',
            options: ['The students are taught by the teacher.', 'The students were taught by the teacher.', 'The students is taught by the teacher.', 'The teacher is taught by the students.'],
            correct: 0,
            explanation: 'Active: Subject + Verb + Object. Passive: Object + be + Past Participle + by + Subject.'
        }
    ],
    'Direct-Indirect': [
        {
            question: 'Convert to indirect: "He said, \'I am happy.\'"',
            options: ['He said that he is happy.', 'He said that he was happy.', 'He said that he will be happy.', 'He said that he has been happy.'],
            correct: 1,
            explanation: 'In indirect speech, present tense changes to past tense: "am" becomes "was".'
        }
    ],
    'Comprehension': [
        {
            question: 'Read the passage: "The sun rises in the east. It provides light and warmth to Earth." What does the sun provide?',
            options: ['Only light', 'Only warmth', 'Light and warmth', 'Nothing'],
            correct: 2,
            explanation: 'The passage clearly states "It provides light and warmth to Earth."'
        }
    ],
    'One Word Substitution': [
        {
            question: 'What is one word for "A person who loves books"?',
            options: ['Bibliophile', 'Philosopher', 'Scholar', 'Writer'],
            correct: 0,
            explanation: 'Bibliophile means a person who loves or collects books.'
        },
        {
            question: 'What is one word for "A person who travels to work daily"?',
            options: ['Tourist', 'Commuter', 'Traveler', 'Pilgrim'],
            correct: 1,
            explanation: 'Commuter refers to a person who travels regularly, especially to work.'
        }
    ]
};

// Topic categories for styling
const topicCategories = {
    'reasoning': ['Analogy', 'Series', 'Coding-Decoding', 'Blood Relation', 'Direction', 'Venn Diagram', 'Puzzle', 'Non-verbal'],
    'gk': ['History', 'Geography', 'Polity', 'Economy', 'Science', 'Current Affairs', 'Static GK'],
    'math': ['Percentage', 'Profit & Loss', 'Average', 'Ratio & Proportion', 'Simple & Compound Interest', 'Time & Work', 'Time, Speed & Distance', 'Mensuration', 'Algebra', 'Data Interpretation'],
    'english': ['Vocabulary', 'Error Spotting', 'Fill in the Blanks', 'Sentence Improvement', 'Active-Passive', 'Direct-Indirect', 'Comprehension', 'One Word Substitution']
};
