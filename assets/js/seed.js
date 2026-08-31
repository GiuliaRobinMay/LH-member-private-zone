/* ==========================================================================
   seed.js — all demo content for the My Lesko Zone mock-up.

   Generated content, safe to edit by hand. Nothing here talks to a server:
   these are the questions, call sheets and follow-ups the demo starts with.
   The organisations are real programmes, but treat them as demo data —
   verify before anything goes in front of members.
   ========================================================================== */

window.LZ_SEED = {
  "topicMap": {
    "bills-debt": "cs-2-debt-calabasas",
    "housing": "cs-4-housing-houston",
    "business": "cs-1-business-rochester",
    "food": "cs-3-food-oklahoma",
    "healthcare": "cs-3-food-oklahoma",
    "education": "cs-2-debt-calabasas",
    "seniors": "cs-4-housing-houston",
    "disability": "cs-3-food-oklahoma",
    "veterans": "cs-2-debt-calabasas",
    "jobs-training": "cs-1-business-rochester",
    "legal": "cs-2-debt-calabasas",
    "cars-transport": "cs-3-food-oklahoma"
  },
  "member": {
    "name": "Aaron Gavenda",
    "location": "Rochester, NY 14604",
    "joined": "2026-03-14"
  },
  "microcopy": {
    "app": {
      "name": "My Lesko Zone",
      "promise": "Ask anything, find real help near you, and keep it all in one place."
    },
    "nav": [
      {
        "key": "home",
        "icon": "🏠",
        "short": "Home",
        "label": "Home",
        "desc": "Where everything starts"
      },
      {
        "key": "ask",
        "icon": "💬",
        "short": "Ask",
        "label": "Ask a Question",
        "desc": "Ask us anything in your own words. A real person writes back."
      },
      {
        "key": "build",
        "icon": "📋",
        "short": "New sheet",
        "label": "Build a Call Sheet",
        "desc": "Tell us what's going on. We find who to call near you."
      },
      {
        "key": "questions",
        "icon": "📬",
        "short": "Questions",
        "label": "My Questions",
        "desc": "Every question you asked, with the answer right underneath."
      },
      {
        "key": "sheets",
        "icon": "📁",
        "short": "My sheets",
        "label": "My Call Sheets",
        "desc": "Every call sheet you made, saved here for good."
      },
      {
        "key": "tracker",
        "icon": "✅",
        "short": "Follow-ups",
        "label": "My Applications",
        "desc": "Who you called, who owes you an answer, who came through."
      }
    ],
    "home": {
      "greeting": "Good to see you. What do you need today?",
      "reassure": "Everything in here is private. Only you and the Lesko Help team can see it, and there is no wrong question.",
      "cards": [
        {
          "key": "ask",
          "title": "I have a question",
          "desc": "Ask it in your own words. Someone on our team reads it and writes back to you, just to you.",
          "cta": "Ask my question",
          "icon": "💬"
        },
        {
          "key": "build",
          "title": "I need help near me",
          "desc": "Tell us what's going on and where you live. We'll make you a list of places to call, with the words to say.",
          "cta": "Build my call sheet",
          "icon": "📋"
        },
        {
          "key": "tracker",
          "title": "I already made calls",
          "desc": "See who you called, who still owes you an answer, and what to do next.",
          "cta": "See my follow-ups",
          "icon": "✅"
        }
      ]
    },
    "ask": {
      "heading": "Ask a Question",
      "intro": "There is no wrong question here, and you don't need to know the right words for it. Write it the way you would say it out loud — spelling doesn't matter one bit. Nobody else in the community sees this. Someone on the Lesko Help team reads every question and writes back to you right here.",
      "fields": [
        {
          "key": "name",
          "label": "Your first name",
          "placeholder": "Example: Jerry",
          "help": "So we can say hello properly when we answer. You can skip this."
        },
        {
          "key": "question",
          "label": "What do you need help with?",
          "placeholder": "Example: I'm behind on my electric bill and I don't know who to call.",
          "help": "Say it in your own words. Long or short is fine, and nothing here gets marked wrong."
        },
        {
          "key": "topic",
          "label": "What is this about?",
          "placeholder": "Choose the closest one",
          "help": "Not sure? Leave it alone. We'll work it out from what you wrote."
        },
        {
          "key": "zip",
          "label": "Your zip code",
          "placeholder": "Example: 73110",
          "help": "Just the five numbers. Help close to home is usually the fastest help."
        },
        {
          "key": "city",
          "label": "Or your city and state",
          "placeholder": "Example: Rochester, New York",
          "help": "Use this instead if you'd rather not give your zip code."
        }
      ],
      "button": "Send my question",
      "confirm": "Sent. Your question is safe with us. We've put it in My Questions — that's where the answer will appear, so you'll never have to go hunting for it. You can close this page; it will be waiting for you."
    },
    "callsheet": {
      "heading": "Build a Call Sheet",
      "intro": "Tell us what's going on and where you live. We'll go and find the real places near you that help with this — who to call first, what they can do for you, how much they can give, and exactly what to say on the phone.",
      "fields": [
        {
          "key": "topic",
          "label": "What kind of help do you need?",
          "placeholder": "Choose the closest one",
          "help": "Pick the one that's nearest. You can tell us the details further down."
        },
        {
          "key": "zip",
          "label": "Your zip code",
          "placeholder": "Example: 91302",
          "help": "Five numbers. This is how we find help close to you."
        },
        {
          "key": "city",
          "label": "Your city or town",
          "placeholder": "Example: Rochester",
          "help": "Fill this in instead if you don't know your zip code."
        },
        {
          "key": "state",
          "label": "Your state",
          "placeholder": "Choose your state",
          "help": "City and state work just as well as a zip code."
        },
        {
          "key": "problem",
          "label": "Tell us what's going on",
          "placeholder": "Example: I lost my job in March and I'm three months behind on rent. I have two grandkids at home and no car.",
          "help": "Say it the way you'd tell a friend. Spelling and grammar don't matter here — nothing is marked wrong and nobody is judging. The more you tell us, the more this list will feel like it was made for you."
        }
      ],
      "button": "Find my help",
      "progress": [
        "Reading what you told us…",
        "Looking for real help near you…",
        "Finding phone numbers and who to ask for…",
        "Writing your call sheet in plain English…"
      ]
    },
    "empty": {
      "questions": {
        "title": "No questions yet",
        "body": "This is where your questions live, each one with the team's answer right underneath it. Ask something and it shows up here — no bookmarking, no scrolling back through the community to find it.",
        "cta": "Ask your first question"
      },
      "callsheets": {
        "title": "No call sheets yet",
        "body": "A call sheet is your list of who to call, what they can do for you, and what to say when they pick up. Make one and it stays here for good — open it any time, print it, tick people off as you go.",
        "cta": "Build my first sheet"
      },
      "applications": {
        "title": "Nothing to follow up on yet",
        "body": "Open one of your call sheets and add the places you plan to ring. Then this page keeps score for you: who you called, who owes you an answer, and who came through.",
        "cta": "Open a call sheet"
      }
    },
    "statuses": [
      {
        "key": "not-started",
        "label": "Not started yet",
        "line": "That's fine. Nothing here is late. One call, whenever you're ready."
      },
      {
        "key": "called",
        "label": "I called them",
        "line": "That's the hardest part done. Write down who you spoke to while it's fresh."
      },
      {
        "key": "applied",
        "label": "I applied",
        "line": "Your name is in. Now it's their turn to move."
      },
      {
        "key": "waiting",
        "label": "Waiting to hear back",
        "line": "Quiet is normal. If it's been two weeks, call and politely ask where things stand."
      },
      {
        "key": "got-help",
        "label": "They helped me",
        "line": "Wonderful. Tell the community — somebody else needs to hear this worked."
      },
      {
        "key": "said-no",
        "label": "They said no",
        "line": "One no is not every no. Go to the next name on your sheet."
      }
    ],
    "labels": {
      "whoFor": "Who this is for",
      "howMuch": "How much you can get",
      "freeStuff": "What they give you free",
      "beforeCall": "Before you call",
      "whatToSay": "What to say on the phone",
      "markCalled": "Mark as called",
      "printSave": "Print or save",
      "startOver": "Start over",
      "viewSheet": "Open this sheet",
      "addToTracker": "Add to my follow-ups",
      "reply": "Write back",
      "askFollowUp": "Ask one more thing",
      "answered": "Answered",
      "waiting": "Waiting for an answer",
      "firstCall": "Start with this one call",
      "thenCall": "Then make these calls",
      "yourWords": "What you told us",
      "whatTheyDo": "What they do, in plain words",
      "whoQualifies": "Who qualifies",
      "whereTheyHelp": "Where they help",
      "datesMatter": "Dates that matter",
      "moneyAvailable": "Grants and loans",
      "phone": "Phone",
      "website": "Website",
      "email": "Email",
      "address": "Where they are",
      "watchOut": "Watch out",
      "tip": "Tip",
      "beforeYouStart": "Before you start",
      "nextSteps": "What to do next",
      "myNotes": "My notes",
      "whoISpokeTo": "Who I spoke to",
      "callAgainOn": "Call them again on",
      "copyScript": "Copy these words",
      "readAloud": "You can read this out loud, word for word.",
      "optional": "You can skip this",
      "privateNote": "Private. Only you and the Lesko Help team see this.",
      "askedOn": "You asked this on",
      "answeredBy": "Answered by",
      "newAnswer": "New answer",
      "back": "Go back",
      "buildAnother": "Build another sheet",
      "sheetSaved": "Saved in My Call Sheets",
      "noRush": "There is no rush. One call is enough for today."
    },
    "topics": [
      {
        "key": "bills-debt",
        "label": "Bills and debt",
        "desc": "Help with electric, gas, water and phone bills, and with credit card debt — LIHEAP energy help, your local Community Action Agency, 211, and nonprofit credit counselors in the NFCC."
      },
      {
        "key": "housing",
        "label": "Housing and rent",
        "desc": "Rent, mortgage, eviction and home repair help — free HUD-approved housing counselors at 1-800-569-4287, your state Housing Finance Agency, and your local public housing agency."
      },
      {
        "key": "business",
        "label": "Starting or growing a business",
        "desc": "Free one-on-one advising and money to get going — your SBA district office, a Small Business Development Center, SCORE mentors, a Women's Business Center, and Kiva loans."
      },
      {
        "key": "food",
        "label": "Food and groceries",
        "desc": "SNAP, WIC, food pantries through Feeding America, senior meals and free meals for kids — dial 211 to find the closest one to your door."
      },
      {
        "key": "healthcare",
        "label": "Health care and medicine",
        "desc": "Low-cost community health centers through HRSA, free Medicare help from your State Health Insurance Assistance Program (SHIP), and drug company programs that cover prescriptions."
      },
      {
        "key": "education",
        "label": "School and training money",
        "desc": "Grants and scholarships you never pay back — start with the free FAFSA at studentaid.gov, then your state grant agency and the aid office at your local community college."
      },
      {
        "key": "seniors",
        "label": "Help for seniors",
        "desc": "Rides, meals, help at home and a check of every benefit you're owed — your Area Agency on Aging through the Eldercare Locator, 1-800-677-1116, and NCOA's BenefitsCheckUp."
      },
      {
        "key": "disability",
        "label": "Help with a disability",
        "desc": "Social Security disability, your state Vocational Rehabilitation office, your local Center for Independent Living, and free equipment loans from your state Assistive Technology program."
      },
      {
        "key": "veterans",
        "label": "Veterans and military families",
        "desc": "Benefits, claims and housing help — a free accredited veterans service officer, your State Department of Veterans Affairs, and the VA at 1-800-698-2411."
      },
      {
        "key": "jobs-training",
        "label": "Jobs and job training",
        "desc": "Free training, resume help and job placement at your local American Job Center — find yours at careeronestop.org or call 1-877-872-5627."
      },
      {
        "key": "legal",
        "label": "Legal help",
        "desc": "Free lawyers for everyday problems like eviction, benefits, debt and family court — legal aid offices at lsc.gov/find-legal-aid and your state bar's free referral line."
      },
      {
        "key": "cars-transport",
        "label": "Cars and getting around",
        "desc": "Rides to the doctor, bus passes, and programs that repair or give away cars — start with 211, your Area Agency on Aging, or your Community Action Agency."
      }
    ],
    "footer": {
      "line": "My Lesko Zone is private. Only you and the Lesko Help team can see what's in here.",
      "signoff": "Questions are free. Always were."
    }
  },
  "threads": [
    {
      "id": "q-electric-shutoff",
      "subject": "Electric goes off Monday and I can't get the $312 together",
      "topic": "bills-debt",
      "status": "waiting",
      "createdAt": "2026-08-30T09:41:00-04:00",
      "ago": "3 hours ago",
      "location": "Rochester, NY 14604",
      "messages": [
        {
          "role": "member",
          "name": "Aaron Gavenda",
          "roleLabel": "You",
          "body": "they put a red paper on the door friday. the electric goes off monday if I dont pay 312.00 and I dont have it, my check dont come till the 3rd. I called the company and the young lady said the most she can do is a payment plan but I have to put 150 down today to start it and I dont have that either. is there anybody around here that helps with this. sorry to ask on a sunday I just dont know who else to ask",
          "ago": "3 hours ago",
          "createdAt": "2026-08-30T09:41:00-04:00"
        }
      ]
    },
    {
      "id": "q-mother-83-alone",
      "subject": "My mother is 83 and alone, can anyone bring her meals?",
      "topic": "seniors",
      "status": "waiting",
      "createdAt": "2026-08-28T16:22:00-04:00",
      "ago": "2 days ago",
      "location": "Elmira, NY 14901",
      "messages": [
        {
          "role": "member",
          "name": "Aaron Gavenda",
          "roleLabel": "You",
          "body": "My mother is 83 and lives by herself in Elmira, about an hour from me. She had a fall in June, shes ok, but she cant stand long enough to cook a real meal anymore and she never learned to drive. I work six days and I cant keep running down there and I am scared shes not eating right. Is there a program that would bring her food, or have somebody look in on her once a week? She wont ask for anything herself, shes proud, so it has to be me that sets it up. Sorry this is long.",
          "ago": "2 days ago",
          "createdAt": "2026-08-28T16:22:00-04:00"
        }
      ]
    },
    {
      "id": "q-grant-phone-scam",
      "subject": "Man called saying I won a $9,000 grant, wants gift cards",
      "topic": "legal",
      "status": "answered",
      "createdAt": "2026-08-25T15:52:00-04:00",
      "ago": "5 days ago",
      "location": "Rochester, NY 14604",
      "messages": [
        {
          "role": "member",
          "name": "Aaron Gavenda",
          "roleLabel": "You",
          "body": "A man called this afternoon and said I was approved for a 9,000 dollar federal grant because I never had a felony and I pay my taxes. He knew my name and my street. He said I have to pay a 250 dollar processing fee in Apple gift cards to release the money and it would be in my account by tomorrow. I had my keys in my hand to drive to Walgreens and then I stopped. Is this real? He has called back twice already and now he says I lose it if I dont go today.",
          "ago": "5 days ago",
          "createdAt": "2026-08-25T15:52:00-04:00"
        },
        {
          "role": "team",
          "name": "Misty Fowlds",
          "roleLabel": "Question Responder",
          "body": "Hi Aaron, it's Misty. I am so glad you stopped and asked before you got in the car. That took good sense, and plenty of people don't stop.\n\nThat call is a scam. Here is a rule you can keep for the rest of your life: a real government grant never charges you a fee to release it, and no real agency will ever ask you for gift cards. Not Apple, not Google Play, not a wire, not a cash app. Ever. The government also does not telephone people to hand out money they never applied for. Every real federal grant in the country is listed for free at grants.gov.\n\nHere is what to do, in order:\n\n1. Don't answer if he calls again. You do not owe him a conversation. On an iPhone: open Phone, tap Recents, tap the little blue (i) next to his number, scroll to the bottom, tap Block this Caller.\n2. Report him. Go to reportfraud.ftc.gov, or call the Federal Trade Commission at 1-877-382-4357. It takes about five minutes and it costs nothing.\n3. Tell one person in your family what happened today. These men work from lists, and if he tries your sister next, she will already know.\n\nThe rush is always the tell, Aaron. Real help never says today or you lose it. You lost nothing today, and you did the hard part right.\n\n- Misty",
          "ago": "5 days ago",
          "createdAt": "2026-08-25T17:20:00-04:00"
        },
        {
          "role": "member",
          "name": "Aaron Gavenda",
          "roleLabel": "You",
          "body": "Misty I reported it, thank you. There is one thing I left out because I was embarrassed. When he called the first time last week I read him my checking account and routing number off the bottom of a check. Nothing has come out, I looked this morning twice. What do I do now.",
          "ago": "4 days ago",
          "createdAt": "2026-08-26T08:12:00-04:00"
        },
        {
          "role": "team",
          "name": "Misty Fowlds",
          "roleLabel": "Question Responder",
          "body": "Aaron, thank you for telling me, and there is nothing to be embarrassed about. He does this for a living and you are not the first person he tried it on today. Three things, and you can do all three before lunch.\n\n1. Call your bank. Use the number printed on the back of your debit card, never a number he gave you. Say exactly this: \"I gave my account and routing number to someone I now believe is a scammer. I would like an alert put on my account, and I need to know whether I should close it and open a new one.\" Most banks will move the account over for you at no charge.\n2. Go to identitytheft.gov. It is the government's own free site. You answer some questions and it prints you a recovery plan with the letters already written for you.\n3. Put a free fraud alert on your credit. You only have to tell one of the three credit bureaus, because the law makes that one tell the other two. The quickest way is online at experian.com/fraudalert. Then get your free credit reports at annualcreditreport.com and look for anything you don't recognise.\n\nYou caught this early and nothing has moved, which is the best place to be catching it. Write back and tell me what the bank says and I will stay with you on it.\n\nQuestions are free. Always were.\n- Misty",
          "ago": "4 days ago",
          "createdAt": "2026-08-26T09:35:00-04:00"
        }
      ],
      "unread": true
    },
    {
      "id": "q-rent-14-day-notice",
      "subject": "Behind on rent, got a 14 day notice, where do I start?",
      "topic": "housing",
      "status": "answered",
      "createdAt": "2026-08-18T14:03:00-04:00",
      "ago": "12 days ago",
      "location": "Rochester, NY 14604",
      "messages": [
        {
          "role": "member",
          "name": "Aaron Gavenda",
          "roleLabel": "You",
          "body": "I am two months behind on my rent, 1,850 all together. My landlord slid a paper under the door that says 14 day notice. I have never been late one time in 11 years here, I got cut back to 22 hours in June and it got away from me. I dont want to be put out, I am 63 years old. Where do I even start. Rochester NY 14604",
          "ago": "12 days ago",
          "createdAt": "2026-08-18T14:03:00-04:00"
        },
        {
          "role": "team",
          "name": "Tony Woodworth",
          "roleLabel": "Question Responder",
          "body": "Hi Aaron, it's Tony. First, take a breath. A 14 day notice is not an eviction. It is a demand for the rent, and it is the step that comes before anything goes to a court. You have time, and eleven years of paying on time is a real thing that we are going to use.\n\nStart with one call, today or first thing Monday. Dial 2-1-1. It is free, somebody answers around the clock, and they hold the list of the local funds that pay back rent in Monroe County. When they pick up, say it in these words: \"I have a 14 day rent demand notice for $1,850 and I need help with back rent and a housing counselor.\"\n\nSay help and assistance. Never say grant or free money. That one habit changes the answers you get.\n\nThen, in this order:\n\n1. A free HUD housing counselor. The government pays them, so they cost you nothing, and they will get on the phone with your landlord alongside you. Call 1-800-569-4287, or go to hud.gov/findacounselor.\n2. Free legal help, before there is ever a court date. Go to lawhelp.org and choose New York, or lsc.gov/find-legal-aid. Tell them \"I received a 14 day demand notice.\" Eviction cases move them faster than anything else.\n3. Your local Community Action Agency. They are the ones holding emergency rent and utility money. Find yours at communityactionpartnership.com/find-a-cap.\n4. The CFPB keeps a live list of rental assistance programs county by county at consumerfinance.gov, search for \"find rental assistance\". Careful of any website still advertising the COVID rental assistance money. That federal program ended and those sites will waste a week of your life.\n5. Then build yourself a call sheet in here. Build a Call Sheet, choose Housing and rent, put in 14604, and in the box that asks what is going on, type it exactly the way you typed it to me. You will get the local names, the numbers, and the words to say when they answer.\n\nHave these four things sitting next to the phone before you dial: your lease, the 14 day notice, your last two pay stubs, and the date your hours were cut to 22. Every one of them is going to ask.\n\nTwo more things, Aaron. Do not move out because of that paper. Leaving on your own costs you every protection you have. And pay something, even fifty dollars, and keep the receipt, because it shows you are acting in good faith and that matters later.\n\nWrite back and tell me what 211 says and we will take the next step together.\n- Tony",
          "ago": "12 days ago",
          "createdAt": "2026-08-18T16:40:00-04:00",
          "attachments": [
            {
              "name": "Rochester_Rent_Help_Numbers.pdf",
              "kind": "PDF",
              "size": "2 pages"
            }
          ]
        },
        {
          "role": "member",
          "name": "Aaron Gavenda",
          "roleLabel": "You",
          "body": "Tony I called 211 like you said. They gave me two places. The first one said their emergency rent money is gone until October. The second one I left a message tuesday and nobody has called me back. Now my landlord filed and I have a court date September 4th. Am I doing this wrong?",
          "ago": "10 days ago",
          "createdAt": "2026-08-20T11:15:00-04:00"
        },
        {
          "role": "team",
          "name": "Tony Woodworth",
          "roleLabel": "Question Responder",
          "body": "You are not doing it wrong, Aaron. What you just described is normal. Funds run dry, voicemails go unanswered, and the people who get the help are simply the ones who keep dialling. But that court date changes the order, so here is the new plan.\n\n1. Legal help moves to the front of the line, today. Call the free legal aid office for Monroe County and say these exact words: \"I have an eviction court date on September 4.\" A court date usually moves you up their list. Find the office at lawhelp.org, choose New York, or at lsc.gov/find-legal-aid. If nobody picks up by tomorrow, call 2-1-1 back and ask specifically for the eviction prevention legal program.\n2. Call that second place back. Do not sit and wait on a voicemail. Ring them right when they open in the morning, ask for the name of the person who handles intake, and write the name down. Next time you call, you ask for them by name. That one trick gets more people through the door than anything else I know.\n3. Go to court on September 4 no matter what happens between now and then. Not showing up is the only way to lose automatically. Get there early. Many courts have free legal help sitting right outside the courtroom that morning, and judges give people more time all the time when they can see the person showed up and has been trying.\n4. Bring a folder: the notice, your lease, your pay stubs, the receipt for anything you have paid, and a written list of every place you called with the date you called them. That list is your evidence of good faith, and it works.\n5. Ask five more places, not one. October money is real money. Ask the first place to put you on their list for October and ask what they need from you now so you are not starting from scratch in six weeks.\n\nYou are doing this right, Aaron. You are just early in it. Tell me what legal aid says and we keep going.\n- Tony",
          "ago": "10 days ago",
          "createdAt": "2026-08-20T13:30:00-04:00"
        }
      ],
      "unread": true
    },
    {
      "id": "q-food-stamps-no-car",
      "subject": "Only $23 a month in food stamps and no car to get to a pantry",
      "topic": "food",
      "status": "answered",
      "createdAt": "2026-08-12T18:47:00-04:00",
      "ago": "18 days ago",
      "location": "Rochester, NY 14604",
      "messages": [
        {
          "role": "member",
          "name": "Aaron Gavenda",
          "roleLabel": "You",
          "body": "they only give me 23 dollars a month in food stamps and I dont understand how they came up with that number. by the third week of the month there is not much in the house. my car has been down since May so I cant get to the pantry they told me about, its 3 miles. is there anything that brings food to you? 14604",
          "ago": "18 days ago",
          "createdAt": "2026-08-12T18:47:00-04:00"
        },
        {
          "role": "team",
          "name": "Lesko Help Team",
          "roleLabel": "Lesko Help Team",
          "body": "Hello Aaron, and thank you for asking. This is the question we get most, and there are two different things going on here. We are going to fix both.\n\nThe $23 first, because that is the bigger money. Food stamp amounts are worked out from your income, and when your income or your hours change, the amount is supposed to change with it. A lot of people are living on an old number that nobody ever went back and updated.\n\nCall the New York State food stamp hotline at 1-800-342-3009, or go to mybenefits.ny.gov, and say: \"My income has changed and I would like my case looked at again.\" While you have them, ask them to check that your rent and your utility costs are on your case, because those raise the amount and they are very often missing.\n\nNow, food this week:\n\n1. Dial 2-1-1 and say \"I need food and I have no transportation.\" Ask specifically about a home delivery route or a volunteer driver. Most food banks have one and they almost never advertise it.\n2. Find your food bank at feedingamerica.org/find-your-local-foodbank and put in 14604. Call the food bank itself, not only the little pantry. The food bank knows every pantry, mobile pantry and delivery run in the county.\n3. You can spend food stamps online. Walmart and Amazon both take EBT for groceries in New York and deliver to the door. It doesn't fix the amount, but it fixes the three miles.\n4. You are 63, so the senior food programs are open to you. Ask 2-1-1 about the senior food box and about the farmers market coupons for people 60 and over.\n\nNone of this costs a dollar, and none of it is charity you need to feel funny about. Tell us what they say and we will take it from there.\n\nQuestions are free. Always were.\n- The Lesko Help Team",
          "ago": "17 days ago",
          "createdAt": "2026-08-13T10:20:00-04:00",
          "attachments": [
            {
              "name": "SNAP_Recalculation_Checklist.pdf",
              "kind": "PDF",
              "size": "1 page"
            }
          ]
        },
        {
          "role": "member",
          "name": "Aaron Gavenda",
          "roleLabel": "You",
          "body": "thank you so much this worked. I called that number and told them my hours went down like you said and the lady is redoing my case, she said it should go up a good bit. and the food bank has a delivery on wednesdays for my street, I am signed up starting next week. I sat down for a minute after I hung up the phone. thank you for not making me feel stupid for asking.",
          "ago": "15 days ago",
          "createdAt": "2026-08-15T09:05:00-04:00"
        }
      ]
    },
    {
      "id": "q-handyman-business",
      "subject": "Want to make my handyman work a real business, is there help?",
      "topic": "business",
      "status": "answered",
      "createdAt": "2026-08-05T08:12:00-04:00",
      "ago": "25 days ago",
      "location": "Rochester, NY 14604",
      "messages": [
        {
          "role": "member",
          "name": "Aaron Gavenda",
          "roleLabel": "You",
          "body": "I have done handyman and lawn work for cash around here for probably 20 years and everybody keeps telling me I should do it for real. To do it right I need a truck that runs, a trailer, and insurance, and I dont know the first thing about the paperwork end of it. I am 63 and I am not good with computers. Is there help for a person like me or is that only for young people with degrees. 14604",
          "ago": "25 days ago",
          "createdAt": "2026-08-05T08:12:00-04:00"
        },
        {
          "role": "team",
          "name": "Tony Woodworth",
          "roleLabel": "Question Responder",
          "body": "Hi Aaron, it's Tony. Twenty years of people asking you to come back and do more work is called market research. Most folks who walk into a bank with a business plan do not have the thing you already have, which is customers.\n\nNow let me be straight with you about the money, because I would rather you hear it from me. There is very little in the way of a plain cash grant for a brand new handyman business. What there is, and there is a lot of it, is free expert help and money you can borrow at zero interest. An hour with an advisor who does this for a living is worth real money, and there is one sitting inside your own zip code.\n\nStart with one call. The Finger Lakes Small Business Development Center, (585) 395-8410. Their Rochester office is at 161 Chestnut Street, 5th floor, which is 14604, your zip. New York State and the SBA pay for it, so it costs you nothing, and there is no limit on how many times you go back.\n\nSay this when they answer: \"My name is Aaron Gavenda. I have done handyman work in Rochester for twenty years and I want to make it a real business. I was told your advising is free and I would like an appointment with an advisor. I am right at the beginning so I don't have much on paper. What should I bring?\"\n\nThen these, in order:\n\n1. SCORE Greater Rochester, (585) 263-6473. Retired business owners who mentor you for free, for as long as you want them. Ask them for one who ran a trades or service business.\n2. The Enterprise Center at PathStone, (585) 340-3324, and the Urban League of Rochester Entrepreneurship Assistance Center, (585) 325-6530. Both run free classes for people starting out, and the state's EAC classes have a name for getting people ready for a loan.\n3. Money. Kiva is a 0% interest loan, no fees, up to $15,000, and it does not hang on your credit score the way a bank does, because it is ordinary people lending you small amounts. The City of Rochester runs the local Kiva hub, (585) 428-6912. Look at kiva.org/borrow first so you know what you are looking at.\n4. And build yourself a call sheet in here. Build a Call Sheet, choose Starting or growing a business, put in 14604, and in the box where it asks what is going on, type it just the way you typed it to me, truck and trailer and all.\n\nOne house rule and it matters more than anything above: never ask anybody for a grant, or for free money. Ask for help, or assistance, or programs for a new small business. Same question, completely different answer.\n\nLast thing, about the computers. Every single one of these is a phone call and a chair in somebody's office. Nobody is going to make you fill in a form on your own. Sitting next to you while you do the paperwork is literally the advisor's job.\n\nYou are not behind, Aaron. You are at the start, which is where every one of them started.\n- Tony",
          "ago": "25 days ago",
          "createdAt": "2026-08-05T11:35:00-04:00",
          "attachments": [
            {
              "name": "Start_Your_Business_Call_Sheet.xlsx",
              "kind": "Excel",
              "size": "14 columns"
            },
            {
              "name": "First_Call_Script.pdf",
              "kind": "PDF",
              "size": "1 page"
            }
          ]
        },
        {
          "role": "member",
          "name": "Aaron Gavenda",
          "roleLabel": "You",
          "body": "Do I have to have the LLC first before I call them? A fella at church told me I need an LLC and a EIN and a DBA and now I am sitting here overwhelmed and I havent called anybody.",
          "ago": "23 days ago",
          "createdAt": "2026-08-07T20:41:00-04:00"
        },
        {
          "role": "team",
          "name": "Tony Woodworth",
          "roleLabel": "Question Responder",
          "body": "Call first, Aaron. Form later. That is the whole answer, but here is why.\n\nThe advisor's job is to tell you which of those three things you actually need, and in what order, for your kind of work. It is usually fewer than people tell you. If you go and set up the wrong thing first, you pay for it twice.\n\nThe honest order for a man doing what you do:\n\n1. Sit down with the SBDC. Free. Bring nothing but the story you told me.\n2. Decide the structure with them. Plenty of one-man trades businesses start as a sole proprietor and add the LLC later, when there is something to protect.\n3. If you do need an EIN, it is free and it takes about ten minutes at irs.gov. Never pay a website for one. There are outfits charging two hundred dollars for a form the IRS gives away.\n4. A DBA in New York is filed at the county clerk and it is not expensive. Your advisor will tell you whether you need one at all.\n5. Insurance last, once you know what you are. Get two quotes, and ask the SBDC which company the other tradesmen in Rochester use.\n\nYour friend at church was not wrong, he was just early. Nobody needs all of it on day one.\n\nMake the call and tell me how it goes.\n- Tony",
          "ago": "22 days ago",
          "createdAt": "2026-08-08T09:15:00-04:00"
        }
      ]
    },
    {
      "id": "q-lost-my-call-sheet",
      "subject": "Where did my call sheet go? I made it on my phone",
      "topic": "support",
      "status": "answered",
      "createdAt": "2026-07-29T13:22:00-04:00",
      "ago": "1 month ago",
      "messages": [
        {
          "role": "member",
          "name": "Aaron Gavenda",
          "roleLabel": "You",
          "body": "probably a dumb question. I made one of those call sheets last week for the business and now I cant find it again. I was on my phone. do they save somewhere or do I have to do the whole thing over? also my daughter says I should print it out but I dont have a printer.",
          "ago": "1 month ago",
          "createdAt": "2026-07-29T13:22:00-04:00"
        },
        {
          "role": "team",
          "name": "Misty Fowlds",
          "roleLabel": "Question Responder",
          "body": "Hi Aaron, it's Misty. Not a dumb question at all. It is the one we get more than any other, which tells us the app should have made it plainer.\n\nNothing is lost. Every call sheet you make saves itself, and it stays here for good.\n\nOn your phone:\n1. Open My Lesko Zone.\n2. Tap the menu at the top, the three little lines.\n3. Tap My Call Sheets.\n4. Your sheets are listed newest first with the date on each one. Tap the business one from last week.\n5. It opens exactly the way you left it, including the boxes you already ticked off.\n\nTo keep it one tap away instead of hunting for it: with My Lesko Zone open in Safari, tap the Share button at the bottom of the screen, the little square with an arrow pointing up out of it. Scroll down that list and tap Add to Home Screen, then tap Add. Now there is a Lesko button sitting on your phone with your other apps.\n\nFor printing with no printer: open the sheet, tap Print or save, choose save as PDF, and email it to yourself. Your daughter can print it straight from the email. Or take it into any Rochester public library branch. They print for about ten or fifteen cents a page and the staff will help you do it.\n\nAnd Aaron, a dumb question is not a thing in here. There is no wrong question.\n- Misty",
          "ago": "1 month ago",
          "createdAt": "2026-07-29T15:05:00-04:00"
        }
      ],
      "location": ""
    },
    {
      "id": "q-wife-lost-insurance",
      "subject": "Wife lost her insurance and is splitting her pills in half",
      "topic": "healthcare",
      "status": "answered",
      "createdAt": "2026-07-17T21:39:00-04:00",
      "ago": "6 weeks ago",
      "location": "Rochester, NY 14604",
      "messages": [
        {
          "role": "member",
          "name": "Aaron Gavenda",
          "roleLabel": "You",
          "body": "My wife Denise is 61 and she lost her insurance when the store cut her to part time. Her blood pressure pills and her inhaler come to 240 a month and I found out she has been splitting the pills in half to make them last, which I know is wrong. She has a back tooth thats bad too and she wont go about it. They told us we make too much for medicaid but not by much. I dont know what to do for her. 14604",
          "ago": "6 weeks ago",
          "createdAt": "2026-07-17T21:39:00-04:00"
        },
        {
          "role": "team",
          "name": "Misty Fowlds",
          "roleLabel": "Question Responder",
          "body": "Aaron, I'm glad you wrote. Splitting blood pressure pills is something a great many people quietly do, and it frightens me for her, so let us take the medicine first and let us do it this week.\n\nYour one call is the community health center nearest you. These are federally funded clinics. They see you with insurance or without it, and what you pay slides according to your income, sometimes down to a few dollars a visit. Most of them have a pharmacy and a dental chair under the same roof, which takes care of that tooth as well.\n\nFind yours by putting 14604 into findahealthcenter.hrsa.gov, or call 1-877-464-4772 and they will find it for you.\n\nWhen they answer, say: \"My wife has no insurance and she needs to be seen, and we need help with the cost of her medicine. Do you have a sliding fee scale?\" They have to have one. That is how they are funded.\n\nThen:\n\n1. Her prescriptions right now. needymeds.org and rxassist.org list the drug companies' own patient assistance programs, and people on blood pressure medicine and inhalers get them free or nearly free all the time. NeedyMeds has a real person on the line at 1-800-503-6897.\n2. At the pharmacy counter, ask two questions out loud: \"What is the cash price without insurance?\" and \"Is there a generic?\" People are shocked how often the cash price is less than what they were paying.\n3. The insurance itself, and I would not skip this one. Too much for Medicaid but not by much, in New York, usually means the Essential Plan, where most people pay nothing at all in premiums. And losing job coverage opens a special sign-up window, so she does not have to wait for January. Call NY State of Health free on 1-855-355-5777 and ask for a navigator to sit and do it with you. The navigator costs nothing either.\n4. If a hospital bill turns up out of any of this, do not pay it before you ask about charity care. Nonprofit hospitals are required to have a financial assistance policy, and dollarfor.org will help you apply for it, free.\n\nYou are not failing her, Aaron. You are doing the hard part, which is asking out loud.\n- Misty",
          "ago": "6 weeks ago",
          "createdAt": "2026-07-18T09:50:00-04:00",
          "attachments": [
            {
              "name": "Prescription_Help_Programs.pdf",
              "kind": "PDF",
              "size": "2 pages"
            }
          ]
        }
      ]
    },
    {
      "id": "q-credit-card-debt",
      "subject": "$9,400 in credit cards, is the TV debt relief ad real?",
      "topic": "bills-debt",
      "status": "answered",
      "createdAt": "2026-06-26T22:14:00-04:00",
      "ago": "2 months ago",
      "location": "Rochester, NY 14604",
      "messages": [
        {
          "role": "member",
          "name": "Aaron Gavenda",
          "roleLabel": "You",
          "body": "Hello, I am in zip 14604 and I desperately need help with credit card debt. It is about 9,400 on three cards and most of it is groceries and the car from when my hours got cut. The minimums come to 320 a month and the balance never moves. I saw an ad on tv for a company that says they settle it for pennies on the dollar but they want 39 dollars a month to start. Is that a real thing or am I being taken. Sorry for the long message.",
          "ago": "2 months ago",
          "createdAt": "2026-06-26T22:14:00-04:00"
        },
        {
          "role": "team",
          "name": "Tony Woodworth",
          "roleLabel": "Question Responder",
          "body": "Hi Aaron, it's Tony. Before anything else. Putting groceries on a credit card when your hours got cut is not a spending problem, it is an income problem. I want you to hear that, because the shame is the thing that keeps people from picking up the phone, and you have nothing to be ashamed of.\n\nNow, that television ad. Be careful. The for-profit debt settlement outfits typically charge fifteen to twenty five percent of your debt, they tell you to stop paying your cards while they negotiate, which wrecks your credit and can get you sued, and it is against federal law for them to charge you a fee before they have actually settled a debt. That thirty nine dollars a month before anything has been settled is exactly the part I would walk away from.\n\nHere is the real version of what they are selling, and it is free or close to it.\n\nCall the National Foundation for Credit Counseling on 1-800-388-2227, or go to nfcc.org and find the nonprofit agency nearest you. The first session is a free budget review. Ask them straight out: \"Would a debt management plan make sense for me?\" On one of those plans the counselor gets your interest rates cut, often from twenty four percent down to single figures, you make one payment a month instead of three, and the cards are paid off in three to five years instead of never.\n\nBefore you call, have these on the table in front of you: the three statements showing the balance, the interest rate and the minimum payment on each; what you actually bring home in a month; and what you pay for rent and utilities. It makes the call twice as useful.\n\nThen:\n\n1. Ring each card company yourself and ask for their hardship program, in those words. Most of them have one that drops your rate or your payment for six to twelve months, and not one of them volunteers it.\n2. If anybody is calling you about an old debt, you have rights. consumerfinance.gov has free sample letters you can send them, and consumerfinance.gov/complaint files an official complaint if they are harassing you.\n3. And build a call sheet in here for Bills and debt with 14604 in it. The money that helps with your electric and your food is money that goes to the cards instead.\n\n- Tony",
          "ago": "2 months ago",
          "createdAt": "2026-06-27T10:05:00-04:00"
        },
        {
          "role": "member",
          "name": "Aaron Gavenda",
          "roleLabel": "You",
          "body": "is it going to wreck my credit to do the counseling? my son says never talk to those people.",
          "ago": "2 months ago",
          "createdAt": "2026-06-28T07:33:00-04:00"
        },
        {
          "role": "team",
          "name": "Tony Woodworth",
          "roleLabel": "Question Responder",
          "body": "Your son is right to be careful, Aaron. He is just thinking of the wrong animal. The television settlement companies and a nonprofit credit counselor are two different things entirely.\n\nTalking to a nonprofit counselor does not touch your credit score. There is no credit check to sit down with them.\n\nIf you go onto a debt management plan, the cards on the plan usually get closed, and closing cards can dip the score for a while. Here is the part your son will like: after that, the balances actually come down and the payments land on time every single month, and those two things are the biggest pieces your score is built out of. Most people are better off inside a year, and far better off than they would have been after a settlement.\n\nThree questions to ask any agency before you agree to a thing:\n1. Are you a nonprofit, and are you a member of the NFCC? Then look them up yourself at nfcc.org rather than taking their word for it.\n2. Is the first session free?\n3. Exactly what will you charge me each month? A real agency's fee is small, and many of them waive it for hardship. If anybody dodges that third question, hang up.\n\nBring the numbers back here after your session and I will go through them with you.\n- Tony",
          "ago": "2 months ago",
          "createdAt": "2026-06-28T11:12:00-04:00"
        }
      ]
    }
  ],
  "callSheets": [
    {
      "id": "cs-1-business-rochester",
      "topic": "Starting a Business",
      "topicKey": "business",
      "suit": "spade",
      "city": "Rochester",
      "state": "New York",
      "zip": "14604",
      "memberName": "Aaron Gavenda",
      "problem": "Hi, my name is Aaron Gavenda. I live in Rochester, NY and I am looking for a grant for a small business loan.",
      "title": "Money and free help to start your business in Rochester",
      "opening": "Aaron, you told us you are in Rochester and looking for a grant for a small business loan. Here is the first thing to know: a grant and a loan are two different things, and for a brand-new business, most of the real money in Rochester sits on the loan side. The good news is that one of those loans charges no interest at all and does not look at your credit score, and the City does have a small grant if you open a shop on a city street. The free coaching to walk you through all of it is at 161 Chestnut Street, inside your own ZIP code, and it costs you nothing.",
      "beforeYouStart": "Get a pen and one sheet of paper. Write down three things: what your business would be, about how much money you need, and what you would spend it on. That is all the getting-ready you need. No business plan. No perfect spelling. Nobody is grading you. One more thing, and it matters: when they pick up, ask for \"help\" or \"a program for someone starting a business.\" Do not open with \"I'm looking for a grant.\" Same question, much better answer.",
      "watchOut": "Never pay a fee to apply for business money. If someone asks you to pay to \"find you a grant\" or to \"release your funds,\" it is a scam. Hang up. And here is the honest part, Aaron: there is no general federal grant for starting a regular for-profit business. Grants.gov is for nonprofits, schools and research projects. The 0% Kiva loan, the City's small storefront grant, and the free advisors below are where your real help is.",
      "firstCall": {
        "orgId": "flx-sbdc",
        "why": "The Finger Lakes SBDC has an office at 161 Chestnut Street, right inside your own ZIP code. New York State and the SBA pay for their advisors, so you pay nothing. They know the loan and grant programs in this region, and one hour with them saves you weeks of guessing which doors are worth knocking on.",
        "whatToSay": "Hello, my name is Aaron Gavenda. I live here in Rochester and I'm getting ready to start a small business. I was told your advising is free, and I'd like to make an appointment with an advisor. I need help working out my start-up costs and finding out which programs I might qualify for. I'm right at the beginning, so I don't have much on paper yet. What would you like me to bring, and when is your earliest opening?"
      },
      "plan": [
        {
          "title": "Make one free phone call before you fill in anything",
          "body": "Call the Finger Lakes SBDC at (585) 395-8410 and book a free appointment. Do this first, before anything else on this sheet. One hour with an advisor who knows the programs in this region is worth more than a week of searching on your own, and it costs you nothing. Every other call on this list goes better after that appointment."
        },
        {
          "title": "Put your numbers on one sheet of paper",
          "body": "Three lines is enough. What the business is. How much money you need. What the money would buy. Every organization on this list will ask you those three things. Once they are written down, you can answer the same way every time and you will not feel put on the spot."
        },
        {
          "title": "Go after the loan that charges no interest",
          "body": "Kiva Rochester lends $1,000 to $15,000 at 0% interest, with no fees and nothing of yours put up as security. You pay it back over about 36 months. City staff help you fill in the form. Call (585) 428-6912 and ask about Kiva Rochester. Then start a list of friends and family who would each lend you a small amount, because that first round of small lenders is what gets the loan moving."
        },
        {
          "title": "Line up the lender who says yes when the banks say no",
          "body": "The Enterprise Center at PathStone, at 400 East Avenue, (585) 340-3324, has been lending to Rochester people the banks turn away since 1997. Their rates run about 7.5% to 9.5%. Ask them what the monthly payment would be while you are still on the phone, before you apply for anything. If the payment does not fit your month, say so out loud. They would rather work it out with you than watch you fail."
        },
        {
          "title": "Check them off as you go, and don't stop at one no",
          "body": "Use the boxes on this sheet so you always know who you have already called. A no from one office is not a no from the next one. They each hold different money under different rules, and the person who keeps dialing is the person who gets funded. If you work through everyone here and you are still stuck, come back and ask us. Questions are free. Always were."
        }
      ],
      "orgs": [
        {
          "id": "flx-sbdc",
          "name": "Finger Lakes Small Business Development Center (SUNY Brockport)",
          "url": "https://www.sbdcbrockport.org/",
          "phone": "(585) 395-8410",
          "email": "sbdc@brockport.edu",
          "address": "161 Chestnut St, 5th Floor, Rochester, NY 14604 (main campus office at SUNY Brockport)",
          "plainWhat": "A business advisor sits down with you, one on one, for as long as you need. They help you work out how much money you need, get your numbers on paper, and point you to the loan and grant programs you can actually get.",
          "whoQualifies": "Anyone in the Rochester area starting or running a small business. No credit check, no fee, no minimum income, no age limit. You do not need a business plan yet.",
          "area": "Monroe County and the wider Finger Lakes region",
          "whenToApply": "Any time. Call now. Appointments usually open up within a week or two.",
          "freeServices": "Free one-on-one business advising, free help writing a business plan, free help with loan applications, free workshops",
          "moneyType": "Free advice only - they help you get to the money",
          "maxAmount": "No money - free help",
          "beforeYouCall": "Have a rough number in your head for what you need and what you would spend it on. Even a guess on the back of an envelope is enough. They would much rather fix your guess than start you from nothing.",
          "script": "Hello, my name is Aaron Gavenda. I live here in Rochester and I'm getting ready to start a small business. I was told your advising is free, and I'd like to make an appointment with an advisor. I need help working out my start-up costs and finding out which programs I might qualify for. I'm right at the beginning, so I don't have much on paper yet. What would you like me to bring, and when is your earliest opening?",
          "priority": 1
        },
        {
          "id": "kiva-rochester",
          "name": "Kiva Rochester (City of Rochester)",
          "url": "https://www.cityofrochester.gov/departments/neighborhood-and-business-development/kiva-rochester-crowdfund-your-dream-change-your",
          "phone": "(585) 428-6912",
          "address": "City of Rochester, Neighborhood & Business Development, 30 Church St, Rochester, NY 14614",
          "plainWhat": "A loan of $1,000 to $15,000 with no interest at all, paid back over about 36 months. You pay back only what you borrowed, and you do not have to put up your car or your house. City staff help you through the whole thing.",
          "whoQualifies": "Rochester-area people starting or running a small business. No minimum credit score. Instead of a credit check, you ask people you know to lend small amounts first, which shows the loan is worth backing. Most people do not expect that part.",
          "area": "Rochester and Monroe County (Kiva itself lends nationwide)",
          "whenToApply": "Open all year. Expect a few weeks from starting the form to money in your hand.",
          "freeServices": "Free one-on-one help from City staff with the application and with paying the loan back",
          "moneyType": "0% interest loan - no fees, nothing put up as security",
          "maxAmount": "Up to $15,000",
          "beforeYouCall": "Make a list of friends, family, neighbors, church folks and old coworkers who would each lend you a small amount. Ask the City how many lenders they want to see for the size of loan you need. Knowing your names before you start beats finding out halfway through.",
          "script": "Hi, my name is Aaron Gavenda and I live in Rochester. I'm starting a small business and I'd like some assistance with the Kiva Rochester program. I understand it's a no-interest loan and that somebody in your office helps people through the application. Could I speak with that person, or set up a time? I'd also like to know how long the whole thing usually takes from start to finish.",
          "priority": 1
        },
        {
          "id": "pathstone-enterprise-center",
          "name": "The Enterprise Center at PathStone",
          "url": "https://theenterprisecenterinc.org/",
          "phone": "(585) 340-3324",
          "email": "peci@pathstone.org",
          "address": "400 East Ave, Rochester, NY 14607",
          "plainWhat": "A local nonprofit lender that makes small business loans to people the banks turn down. They have been doing it in Rochester since 1997. They also run free training and help you get your paperwork right before you apply.",
          "whoQualifies": "Start-ups and small business owners in Western New York and the Finger Lakes, including people with poor credit or little bank history. They look at your plan and your character, not only your score.",
          "area": "Rochester, Western New York and nearby counties",
          "whenToApply": "Any time. Expect roughly 30 to 60 days from application to a decision.",
          "freeServices": "Free business training and free one-on-one help getting your loan paperwork together",
          "moneyType": "Small business loan from a real lender, so there is interest to pay",
          "maxAmount": "Small loans from about $500; larger business loans up to $250,000. Rates are usually 7.5% to 9.5%, paid back over up to five years.",
          "beforeYouCall": "Ask them straight out what the interest rate and the monthly payment would be, before you fill in a single form. A decent lender will tell you on the phone. If the payment does not fit your month, say so.",
          "script": "Good morning, my name is Aaron Gavenda. I'm in Rochester and I'm starting a small business. I'm looking for assistance with financing, and I understand you lend to people who are just getting going. Could you tell me what your smallest loan is, what the interest rate and the monthly payment would look like, and what you'd need from me? And do you have any free training I should take before I apply?",
          "priority": 1
        },
        {
          "id": "score-rochester",
          "name": "SCORE Greater Rochester",
          "url": "https://www.score.org/greaterrochester",
          "phone": "(585) 263-6473",
          "address": "100 State St, Room 410, Rochester, NY 14614",
          "plainWhat": "Retired business owners who coach you for free, for as long as you are in business. You get matched with one person who has run the kind of business you want to run. You can meet in person, over the phone, or on video from home.",
          "whoQualifies": "Anybody. Any age, any idea, any stage, even if it is still only an idea in your head. There is no charge, ever.",
          "area": "Rochester and the surrounding counties",
          "whenToApply": "Any time. You can ask to be matched with a mentor today.",
          "freeServices": "Free mentoring for the life of your business, free and low-cost workshops",
          "moneyType": "Free advice only",
          "maxAmount": "No money - free help",
          "beforeYouCall": "Ask to be matched with a mentor who has actually run a business like the one you want. That is a fair thing to ask for and it makes a real difference. If the first person is not a good fit, you are allowed to ask for somebody else.",
          "script": "Hello, my name is Aaron Gavenda and I'm in Rochester. I'm starting a small business and I'd like to be matched with a mentor. If it's possible, I'd like somebody who has run this kind of business themselves. I understand there's no charge for this. Can you tell me how the matching works, and how soon I could be talking to somebody?",
          "priority": 2
        },
        {
          "id": "urban-league-roc-eac",
          "name": "Urban League of Rochester - Entrepreneurship Assistance Center & Rochester Women's Business Center",
          "url": "https://www.urbanleagueroc.org/business-development",
          "phone": "(585) 325-6530",
          "address": "265 North Clinton Ave, Rochester, NY 14605",
          "plainWhat": "A free New York State class that teaches you how to start and run a business, followed by one-on-one help finishing your plan. The same office runs the Rochester Women's Business Center. The class is open to men and women both.",
          "whoQualifies": "Anyone starting or growing a business in the Rochester area. The state pays for it, so it is free to you. They also help business owners get New York State MWBE certified, which is a state list of minority-owned and women-owned businesses.",
          "area": "Rochester and Monroe County",
          "whenToApply": "Classes run in cycles through the year. Call and get your name down for the next start date.",
          "freeServices": "Free entrepreneurship class, free one-on-one counseling, free help with state MWBE certification",
          "moneyType": "Free training - no money directly",
          "maxAmount": "No money - free help",
          "beforeYouCall": "Ask for the Entrepreneurship Assistance Center, and ask when the next class starts and how many weeks it runs. Then ask whether finishing the class helps you with the lenders they work with. It often does, and nobody tells you that unless you ask.",
          "script": "Hi, my name is Aaron Gavenda and I live in Rochester. I'm calling about the Entrepreneurship Assistance Center program. I'm starting a small business and I'd like to get into your next class and get some one-on-one assistance with my plan. When does the next class start, and what do I need to do to get my name on the list?",
          "priority": 2
        },
        {
          "id": "city-of-rochester-business",
          "name": "City of Rochester - Business Development Division",
          "url": "https://www.cityofrochester.gov/departments/neighborhood-and-business-development/business-loans-services-and-grants",
          "phone": "(585) 428-6912",
          "address": "City Hall, 30 Church St, Rochester, NY 14614",
          "plainWhat": "The City's own money for small businesses inside city limits. They do low-interest loans, and a Neighborhood Commercial Assistance grant for shops and service businesses on city streets. The City also runs a free training program called Prepare to Prosper, on a separate line, (585) 428-6803.",
          "whoQualifies": "Businesses located inside the City of Rochester. The grant is aimed at retail and neighborhood service businesses with a storefront, so where you set up matters. New businesses can get up to $5,000; businesses open 12 months or more can get up to $8,000.",
          "area": "City of Rochester only - and your 14604 is in the city",
          "whenToApply": "Programs open and close through the year. Ask what is open right now and what is coming next.",
          "freeServices": "Free help filling in the applications; free Prepare to Prosper business training through the City's Office of Financial Empowerment",
          "moneyType": "Low-interest loans and small storefront grants",
          "maxAmount": "Neighborhood Commercial Assistance grants up to $5,000 for a new business, up to $8,000 once you have been open a year. Loan amounts vary - ask what is open today.",
          "beforeYouCall": "Have your business address ready, or the address you are looking at. Nearly all City money depends on being inside city limits, so that is the first thing they will ask you.",
          "script": "Hello, my name is Aaron Gavenda. I'm a City of Rochester resident and I'm starting a small business here in the city. I'd like to know what programs the City has open right now for somebody in my position, whether that's a loan or assistance with equipment or a sign. Could you tell me what's open today, and whether there's something coming up I should be getting ready for?",
          "priority": 2
        },
        {
          "id": "sba-rochester-branch",
          "name": "U.S. Small Business Administration - Rochester Branch (Buffalo District)",
          "url": "https://www.sba.gov/district/buffalo",
          "phone": "(585) 263-6700",
          "address": "100 State St, Room 410, Rochester, NY 14614",
          "plainWhat": "The federal small business office for your county. They do not hand you cash. They back loans through banks and credit unions so those lenders will say yes, and they point you to the small local lenders who make microloans. Ask about the Microloan program.",
          "whoQualifies": "Small businesses in Livingston, Monroe, Ontario, Seneca, Wayne and Yates counties. Rochester is Monroe County, so you are covered.",
          "area": "Monroe County plus five neighboring counties",
          "whenToApply": "Any time, Monday to Friday, 8:00am to 4:30pm. Closed federal holidays.",
          "freeServices": "Free guidance and free referrals to lenders and to their free counseling partners",
          "moneyType": "Loan guarantees, plus microloans through partner lenders",
          "maxAmount": "Microloans up to $50,000 (the average one is around $13,000)",
          "beforeYouCall": "Ask about the Microloan program by name, and ask for the names of their microloan lenders near Rochester. Then ask them to be straight with you about whether any federal grant fits what you want to do. They will tell you the truth, and that saves you months.",
          "script": "Good morning, my name is Aaron Gavenda and I'm in Rochester, Monroe County. I'm starting a small business and I'm looking for assistance with financing. I'd like to ask about the Microloan program, and whether you can give me the names of the microloan lenders working in the Rochester area. I'd also appreciate an honest answer about which federal programs a brand-new business like mine can really use.",
          "priority": 2
        },
        {
          "id": "esd-finger-lakes",
          "name": "Empire State Development - Finger Lakes Regional Office",
          "url": "https://esd.ny.gov/regions/finger-lakes",
          "phone": "(585) 399-7050",
          "address": "255 East Ave, Suite 101, Rochester, NY 14604",
          "plainWhat": "New York State's business office for the Rochester region. State programs, state loan funds and state certifications all run through here. This is also where a minority-owned or woman-owned business gets on the state's MWBE list, which opens the door to state contracts.",
          "whoQualifies": "New York State businesses. Be warned: most state programs want to see jobs created or money invested, so this one is usually more useful once you are a little further along.",
          "area": "The Finger Lakes region of New York State",
          "whenToApply": "Any time. MWBE certification is open all year.",
          "freeServices": "Free guidance on state programs, free help with MWBE certification",
          "moneyType": "State loans, tax credits and a few grant programs",
          "maxAmount": "Varies widely by program - ask them which ones fit a one-person start-up",
          "beforeYouCall": "Ask them plainly which of their programs a brand-new one-person business can actually use. A lot of state money is aimed at bigger employers, and knowing that up front saves you weeks. For MWBE certification questions the state's own helpline is (212) 803-2433, or email MWBEBusinessDev@esd.ny.gov. Ask them to confirm there is no application fee.",
          "script": "Hello, my name is Aaron Gavenda and I'm in Rochester, in the Finger Lakes region. I'm starting a small business and I'd like some help working out which New York State programs somebody at my stage can actually use. Could you tell me what's available for a very small, brand-new business, and who I should speak to about certification if that applies to me?",
          "priority": 3
        },
        {
          "id": "roc-library-business-insight",
          "name": "Business Insight Center - Central Library of Rochester & Monroe County",
          "url": "https://roccitylibrary.org/division/business-insight-center/",
          "phone": "(585) 428-8130",
          "email": "business.insight@libraryweb.org",
          "address": "Central Library, 4th floor, Bausch & Lomb Building, 115 South Ave, Rochester, NY 14604",
          "plainWhat": "Librarians who do your business research for you, free. They look up how many people near you might buy what you are selling, what other businesses charge, and they hand you sample business plans you can follow. Not many people know this is here.",
          "whoQualifies": "Anyone. You do not need a library card to sit down and talk with them.",
          "area": "Rochester and Monroe County",
          "whenToApply": "Any time the library is open. Call ahead and they will have material waiting for you.",
          "freeServices": "Free market research, free reports on who lives near you, free sample business plans, free use of research services that cost a lot on your own",
          "moneyType": "Free research only",
          "maxAmount": "No money - free help",
          "beforeYouCall": "Tell them exactly what you want to sell and where. The more specific you are, like a coffee cart downtown or lawn care around 14604, the better the research they can put in your hands.",
          "script": "Hi, my name is Aaron Gavenda. I'm starting a small business here in Rochester and I was told your Business Insight Center helps people with research. I'd like some assistance finding out how many customers there might be for what I want to sell in my area, and I'd like to look at some sample business plans. When would be a good time to come in, or can you help me over the phone?",
          "priority": 3
        }
      ],
      "called": [
        "flx-sbdc",
        "kiva-rochester",
        "pathstone-enterprise-center"
      ],
      "createdAt": "2026-08-28T14:20:00Z"
    },
    {
      "id": "cs-2-debt-calabasas",
      "topic": "Paying Off Bills & Debt",
      "topicKey": "bills-debt",
      "suit": "diamond",
      "city": "Calabasas",
      "state": "California",
      "zip": "91302",
      "memberName": "Leah",
      "problem": "Hello, I am in ZIP Code 91302 and I desperately need help paying off credit card debt. The minimum payments are more than I can make now and I dont know who to call.",
      "title": "Leah, here's real help with your credit cards",
      "opening": "You told us you are in Calabasas and you badly need help with credit card debt. I am going to be straight with you, because you deserve the truth and not a runaround. There is no government grant that pays off a personal credit card. Anyone who says there is wants your money. But there is real free help, and I found it for you. Nonprofit counselors can often get the card companies to charge you a much lower interest rate and turn all those bills into one payment. And there are programs right here in Los Angeles County that lower your other bills, so more of your money is left for the cards.",
      "beforeYouStart": "Before your first call, gather every credit card statement you can find. For each card, write down three things: what you owe, the interest rate, and the smallest payment they will take. Then write down what money comes in each month and what has to go out. Keep it all next to the phone. And Leah, please hear this. You are not in trouble for calling. These counselors talk to people in your exact spot every single day, and the first conversation costs nothing.",
      "watchOut": "Never pay a company up front to \"erase\", \"settle\" or \"forgive\" your debt. Under federal law, a for-profit debt relief company that reaches you by phone cannot charge you one penny until it has actually settled or changed the terms of one of your debts and you have made a payment under that new deal. So if they want money before anything has happened, that is your answer. Real nonprofit counselors never charge you just to talk, and no real program ever asks you to pay a fee to release money to you. If someone has already taken money from you, report them for free at reportfraud.ftc.gov, and in California also at dfpi.ca.gov or 866-275-2677.",
      "firstCall": {
        "orgId": "nfcc",
        "why": "Everything else on this sheet works better after this one call. A trained counselor sits down with you, for free, and puts every card, every interest rate and your income on one page. Then they tell you plainly what will work and what will not. Nothing to buy, nothing to sign.",
        "whatToSay": "Hi, my name is Leah. I live in Calabasas, California, and I have fallen behind on my credit cards. I would like to set up a free counseling session with a certified counselor. I want someone to look at everything with me and tell me honestly what my options are, including whether a debt management program would help me. Can you tell me what I need to have ready, and when someone can talk with me?"
      },
      "plan": [
        {
          "title": "1. Make the free counseling call first",
          "body": "Call the National Foundation for Credit Counseling at 800-388-2227 and ask for a free session. It usually takes 45 minutes to an hour. A counselor goes through your credit report with you, lists every card, and tells you plainly what will help and what will not. There is nothing to buy and nothing to sign. Do this before anything else, because it tells you which of the other calls on this sheet are worth your time."
        },
        {
          "title": "2. Ask about a Debt Management Plan, and ask what it costs",
          "body": "This is the thing that really helps people in your spot. You make one payment a month to the nonprofit agency, and they pay each card company for you. The card companies often agree to drop your interest rate a long way and stop the late fees. Most people finish in three to five years. Your cards get closed while you are on it. Ask two questions out loud: what is the monthly fee, and can it be lowered for hardship? Nonprofit fees are usually about $25 to $50 a month, plus a one-time setup fee, and they can often be reduced. While you wait for that call, phone each of your own card companies too and ask for their hardship program. Many have one, it is free to ask, and it can lower your payment right away."
        },
        {
          "title": "3. Free up cash by shrinking your other bills",
          "body": "This is the closest thing to extra money there is, and most people never claim it. Call Southern California Edison at 800-655-4555 and SoCalGas at 877-238-0092 and ask for the CARE discount. Call 866-675-6623 about LIHEAP if you are behind on an energy bill. Apply for CalFresh to get grocery money. Call 211 for anything urgent. Every dollar you stop paying somewhere else is a dollar that can go to a card."
        },
        {
          "title": "4. If you are being sued or chased, get free help the same week",
          "body": "If court papers arrive about a debt, call Neighborhood Legal Services of Los Angeles County at 800-433-6251 right away. You usually have only 30 days from the date on the papers, and doing nothing is the one thing that really hurts you. If a card company or a collector is treating you badly, file a free complaint with the Consumer Financial Protection Bureau at 855-411-2372. They make the company answer you in writing, usually within 15 days."
        },
        {
          "title": "5. Say no to anyone who calls promising to wipe your debt",
          "body": "Once you start looking for help, these companies find you. They sound official and they sound kind. If they want a fee before anything has happened, hang up. Then report them for free at reportfraud.ftc.gov or 877-382-4357, and to California's Department of Financial Protection and Innovation at 866-275-2677. You are protecting the next person too."
        }
      ],
      "orgs": [
        {
          "id": "nfcc",
          "name": "National Foundation for Credit Counseling (NFCC)",
          "url": "https://www.nfcc.org",
          "phone": "800-388-2227",
          "address": "No office visit needed. Counselors work by phone. To find a nonprofit agency near you, go to nfcc.org",
          "plainWhat": "A network of nonprofit counseling agencies that has been around since 1951. You talk to a real, trained person for free. They look at every card, every bill and your income, and tell you honestly what your choices are. They are not selling you anything.",
          "whoQualifies": "Anyone. No income limit, no credit score minimum, and no fee for the first session. You do not need to be behind on payments to call.",
          "area": "All 50 states, including Calabasas and all of Los Angeles County. Sessions happen by phone or online.",
          "whenToApply": "Any time. Phone lines are open on weekdays and many counselors take evening appointments. There is no waiting list and no form to fill in first.",
          "freeServices": "Free budget and debt review with a certified counselor, usually 45 to 60 minutes. Free written action plan. Free review of your credit report with you.",
          "moneyType": "Free advice, plus a Debt Management Plan that can lower the interest you pay",
          "maxAmount": "No money - free help and a lower interest rate on your cards",
          "beforeYouCall": "Have the last statement for every credit card in front of you. For each one you need the balance, the interest rate, and the smallest payment they will take. Also have a rough figure for what comes in each month. Without those numbers the counselor can only speak in general terms, and you will have to call back.",
          "script": "Hi, my name is Leah. I live in Calabasas, California, and I have fallen behind on my credit cards. I would like to set up a free counseling session with a certified counselor. I want someone to look at everything with me and tell me honestly what my options are, including whether a debt management program would help me. Can you tell me what I need to have ready, and when someone can talk with me?",
          "priority": 1
        },
        {
          "id": "mmi",
          "name": "Money Management International (MMI)",
          "url": "https://www.moneymanagement.org",
          "phone": "866-889-9347",
          "address": "Counseling is done by phone, and their lines are open around the clock. Office locations are listed at moneymanagement.org",
          "plainWhat": "One of the biggest nonprofit credit counseling agencies in the country, and a member of the NFCC. They serve California. They are the kind of agency that actually runs a Debt Management Plan: you pay them once a month, and they pay each of your card companies for you.",
          "whoQualifies": "Anyone can have the free session. To go onto a payment plan you need enough steady income to cover one reduced payment a month. They work that out with you on the call.",
          "area": "California, including Los Angeles County and ZIP code 91302. Everything can be done over the phone.",
          "whenToApply": "Any time. The counseling session is free and can usually be booked within a day or two.",
          "freeServices": "Free counseling session, free budget worksheet, free review of your credit report, and a free written plan you can keep.",
          "moneyType": "Debt Management Plan - one monthly payment at a lower interest rate",
          "maxAmount": "No money - your card interest and late fees usually come down instead",
          "beforeYouCall": "Ask straight out what the monthly fee is and whether it can be lowered for hardship. Nonprofit plans normally carry a small monthly charge, often about $25 to $50, plus a one-time setup fee, and it can often be reduced. A real nonprofit will answer that question plainly. If anyone dodges it, that is your signal to stop.",
          "script": "Hi, my name is Leah, in Calabasas, California, ZIP code 91302. I am struggling with my credit card payments and I was told you are a nonprofit counseling agency. I would like a free session to go over my budget and my cards. I would also like to know if I qualify for a debt management program, what my monthly payment would be, and what the monthly fee is. Is there any way that fee can be lowered for hardship?",
          "priority": 1
        },
        {
          "id": "211-la-county",
          "name": "211 LA County",
          "url": "https://211la.org",
          "phone": "211 (or 800-339-6993)",
          "address": "Phone and online only. No office visit and no appointment.",
          "plainWhat": "A free helpline for Los Angeles County that answers 24 hours a day. A real person picks up. They keep track of which local funds still have money left this month for rent, utilities, food, medicine and getting around, and they tell you where to go.",
          "whoQualifies": "Anyone living in Los Angeles County. You do not have to prove your income to make the call. It is free and private, and they have people who speak many languages.",
          "area": "All of Los Angeles County, including Calabasas and ZIP code 91302.",
          "whenToApply": "Any time, day or night, 7 days a week. Call the moment a bill turns urgent, not after the power is off.",
          "freeServices": "Free referrals to local help, help working out what you qualify for, and sometimes a direct connection to an agency that can pay a past-due bill for you.",
          "moneyType": "Emergency bill help through local partner agencies",
          "maxAmount": "It varies, and it depends on what the local funds have left that month",
          "beforeYouCall": "Decide before you dial which single bill is the most urgent, and have the due date or shut-off date in front of you. 211 can move fastest when you can say \"my gas goes off on the 14th\" instead of \"I am behind on everything\".",
          "script": "Hi, my name is Leah and I am in ZIP code 91302 in Calabasas. Money is very tight and I am behind on my bills. I am looking for any assistance programs in Los Angeles County that could help with my utility bill, my rent, or food, so that I have a little more to put toward my debts. Could you tell me what is available near me and what I need to do to apply?",
          "priority": 1
        },
        {
          "id": "la-dcba",
          "name": "LA County Department of Consumer and Business Affairs",
          "url": "https://dcba.lacounty.gov",
          "phone": "800-593-8222",
          "address": "320 West Temple Street, Room G-10, Los Angeles, CA 90012. Open Monday to Friday, 8:00am to 4:30pm. Free counseling is also offered at sites around the county, listed at dcba.lacounty.gov",
          "plainWhat": "Your county government's own consumer office. Two things they do matter to you: free one-to-one money counseling, and stepping in with a company on your behalf when you are being treated unfairly. It costs nothing and they are not selling anything.",
          "whoQualifies": "People who live in Los Angeles County. There is no income test for the consumer complaint help.",
          "area": "All of Los Angeles County, including Calabasas.",
          "whenToApply": "Any time. Appointments for free money counseling are usually available within a couple of weeks.",
          "freeServices": "Free money counseling appointments, free help disputing a charge or a collection, free help sorting out a problem with a company, free tax filing help in season, and free consumer guides. English and Spanish.",
          "moneyType": "Free help only",
          "maxAmount": "No money - free counseling and free help dealing with companies",
          "beforeYouCall": "Write down the company names, your account numbers, and the dates things happened, before you dial. If a collector has called you, note the date and roughly what was said. They can act on specifics. They cannot do much with \"someone keeps calling me\".",
          "script": "Hi, my name is Leah and I live in Calabasas, in Los Angeles County. I am having trouble with credit card debt, and I understand the county offers free financial counseling to residents. I would like to make an appointment with a counselor. I also have some questions about how a collection company has been treating me. Who do I need to speak with, and what should I bring with me?",
          "priority": 2
        },
        {
          "id": "sce-socalgas-care",
          "name": "CARE & FERA Utility Discounts - Southern California Edison and SoCalGas",
          "url": "https://www.sce.com/save-money/income-qualified-programs/care-fera",
          "phone": "800-655-4555 (Edison) and 877-238-0092 (SoCalGas)",
          "address": "No office visit. Apply over the phone, or on the company's website.",
          "plainWhat": "A discount on your electric and gas bill, every single month, for people on a modest income. Roughly 30 percent off the electricity and about 20 percent off the gas. You never pay it back. Huge numbers of people qualify and simply never sign up.",
          "whoQualifies": "Households under the income limit. For a household of one or two people that limit has recently been about $42,300 a year, and it goes up with more people in the home, so ask them for today's number. You also qualify automatically if you already get CalFresh, Medi-Cal, SSI, LIHEAP or certain other programs. FERA is a smaller discount for households just over the CARE line.",
          "area": "Southern California Edison and SoCalGas both serve Calabasas and ZIP code 91302.",
          "whenToApply": "Any time. It takes about ten minutes on the phone. You confirm your income again every few years to keep it.",
          "freeServices": "Free application, free income review, and they will also check whether you qualify for a medical needs allowance and for a plan that spreads your bill evenly across the year.",
          "moneyType": "Monthly discount on your bill",
          "maxAmount": "About 30% off electricity and about 20% off gas, every month",
          "beforeYouCall": "Have your account number, which is printed on your bill, and know roughly your household income and how many people live in the home. You usually do not need to send any documents to start. They take your word on the phone and only ask for proof later if they need it.",
          "script": "Hi, my name is Leah and I am a residential customer. I have my account number here from my bill. I am on a very tight income right now and I would like to apply for the CARE program, or the FERA program if I do not qualify for CARE. Can you take my application over the phone today, and can you tell me when the discount will start showing on my bill?",
          "priority": 2
        },
        {
          "id": "california-liheap",
          "name": "LIHEAP Energy Bill Help - California Dept. of Community Services & Development",
          "url": "https://www.csd.ca.gov",
          "phone": "866-675-6623",
          "address": "No single office. Call the number above and they will tell you which local agency covers ZIP code 91302, or apply online at caliheapapply.com",
          "plainWhat": "Help paying a gas or electric bill, usually once a year. The money goes straight to the utility company, not to you, so nothing lands in your bank account and nothing has to be paid back. There is faster help if you are holding a shut-off notice.",
          "whoQualifies": "Households under the state income limit. Households with older adults, young children, or someone with a disability are usually served first.",
          "area": "All of California. A local community action agency takes the applications for your part of Los Angeles County.",
          "whenToApply": "As early in the program year as you can. This is a fixed pot of money and local agencies do run out. If you have a shut-off notice, say so on the very first call. That moves you to the front.",
          "freeServices": "Free help filling in the application. The same local agencies often run free weatherizing of your home and free repair of a heater or air conditioner.",
          "moneyType": "A one-time payment made straight to your utility company",
          "maxAmount": "Usually a few hundred dollars, and up to $1,500 in a shut-off emergency",
          "beforeYouCall": "Have your most recent gas and electric bills, proof of the last month of income for everyone in the home (pay stubs, Social Security or benefit letters), a photo ID, and the number of people living with you. Missing income proof is the number one reason people get turned away and have to start over.",
          "script": "Hi, my name is Leah and I live in ZIP code 91302 in Los Angeles County. I would like to apply for the Low Income Home Energy Assistance Program to help with my gas and electric bill. Can you tell me which local agency covers my address, whether they are taking applications right now, and exactly what paperwork I need to bring in?",
          "priority": 2
        },
        {
          "id": "calfresh-la",
          "name": "CalFresh Food Benefits - Los Angeles County DPSS",
          "url": "https://www.getcalfresh.org",
          "phone": "866-613-3777",
          "address": "No office visit needed. Apply online at getcalfresh.org or benefitscal.com, or find your nearest LA County office at dpss.lacounty.gov",
          "plainWhat": "Money loaded onto a card every month, just for groceries. It does not touch your credit cards directly. But every dollar of food you no longer pay for out of your own pocket is a dollar you can put toward a card. This is your own tax money coming back to you.",
          "whoQualifies": "There are income limits. In California a single person can often qualify with income under about $2,610 a month, and the limit is higher with more people in the home. Most people can keep a car and a modest savings account. Being in debt does not disqualify you.",
          "area": "Los Angeles County, including Calabasas and ZIP code 91302.",
          "whenToApply": "Any time. The online form takes about ten minutes. A decision normally comes within 30 days, or within 3 days if you have almost no money coming in right now.",
          "freeServices": "Free help applying by phone or online, free help gathering your documents, and CalFresh often opens the door to other discounts, including the CARE discount on your utility bill.",
          "moneyType": "Monthly food money on an EBT card",
          "maxAmount": "Up to about $298 a month for one person, more for a bigger household",
          "beforeYouCall": "Have your ID, what you pay in rent, your gas and electric bills, and any proof of income. Be sure to tell them your rent and any medical costs. People leave those off and end up with a much smaller monthly amount than they should have had.",
          "script": "Hi, my name is Leah and I live in ZIP code 91302 in Los Angeles County. I would like to apply for CalFresh food benefits. Money is very tight for me right now. Can you tell me if I can apply over the phone today, what proof of income you need from me, and roughly how long it takes before I would have the card in my hand?",
          "priority": 2
        },
        {
          "id": "cfpb",
          "name": "Consumer Financial Protection Bureau (CFPB)",
          "url": "https://www.consumerfinance.gov",
          "phone": "855-411-2372",
          "address": "No office visit. File online at consumerfinance.gov/complaint, or call the number above.",
          "plainWhat": "The federal agency for money problems. If a credit card company or a debt collector is doing something wrong to you, you tell the CFPB and they make that company answer you in writing, usually within 15 days. It is free, and it works more often than people expect.",
          "whoQualifies": "Anyone. No income test, no fee, and you do not need a lawyer.",
          "area": "The whole country.",
          "whenToApply": "Any time. Especially if a collector calls you at work, calls over and over, threatens you, or is chasing a debt you do not recognize.",
          "freeServices": "Free handling of your complaint, free letters you can copy and send to debt collectors, free plain-English guides on credit cards, and a free list of your rights.",
          "moneyType": "Free help only",
          "maxAmount": "No money - free complaints and free letters that get results",
          "beforeYouCall": "Have the account numbers, the dates, the names of anyone you spoke to, and any letters you were sent. Write down what happened in the order it happened. A clear list of dates is what turns a complaint into an answer.",
          "script": "Hi, my name is Leah and I am calling about a credit card company. I am having a problem with the way they are handling my account and I would like to file a complaint. Can you walk me through what information you need from me, and tell me what happens after I file? I would also like to know where to find your free sample letters for dealing with debt collectors.",
          "priority": 3
        },
        {
          "id": "nlsla",
          "name": "Neighborhood Legal Services of Los Angeles County",
          "url": "https://www.nlsla.org",
          "phone": "800-433-6251",
          "address": "Offices across LA County, including the San Fernando Valley. Find the nearest one at nlsla.org. If they cannot take your case, the statewide list is at lawhelpca.org",
          "plainWhat": "Free lawyers for people with a low income in Los Angeles County. If you have been sued over a credit card, or money is being taken out of your paycheck or your bank account, these are the people to call, and to call quickly. They also help when a debt collector breaks the rules.",
          "whoQualifies": "Los Angeles County residents with a low income. They will ask a few questions about your income and how many people are in your home on the first call.",
          "area": "All of Los Angeles County, including Calabasas and the whole San Fernando Valley.",
          "whenToApply": "Straight away if court papers have arrived. You usually have only 30 days from the date on those papers to answer, and missing that date is what leads to money being taken from your pay later.",
          "freeServices": "Free legal advice, free representation in some cases, free help answering a lawsuit, free help stopping money being taken from your paycheck, and free walk-in clinics.",
          "moneyType": "Free legal help",
          "maxAmount": "No money - free lawyers and free help in court",
          "beforeYouCall": "Have the court papers in your hand and read out the date printed on them. That date decides everything about how fast they can act. Do not put the papers in a drawer unopened. That is the single most costly thing people do.",
          "script": "Hi, my name is Leah and I live in Calabasas, in Los Angeles County. I have received papers about a credit card debt and I need legal help. I have a low income and I cannot pay a lawyer. Can you tell me whether I qualify for free assistance, and how soon I can speak with someone? The date printed on my papers is coming up soon and I am worried about missing it.",
          "priority": 3
        },
        {
          "id": "ftc",
          "name": "Federal Trade Commission - Report a Debt Relief Scam",
          "url": "https://reportfraud.ftc.gov",
          "phone": "877-382-4357",
          "address": "Report online at reportfraud.ftc.gov. It takes about ten minutes and you do not need to set up an account.",
          "plainWhat": "Where you report a company that lied to you or took your money. Reporting will not usually get your money back on its own. But it is how these outfits get investigated and shut down, and it puts your story on the record if you later ask your bank to reverse a payment.",
          "whoQualifies": "Anyone. You do not have to have lost money to report. A suspicious call is worth reporting too.",
          "area": "The whole country. In California, also report to the Department of Financial Protection and Innovation.",
          "whenToApply": "As soon as it happens. If you paid by card or bank transfer, call your bank the same day and ask them to stop or reverse the payment.",
          "freeServices": "Free reporting, free consumer guides on debt collection and debt relief, and free step-by-step advice on what to do after you have been scammed.",
          "moneyType": "Free help only",
          "maxAmount": "No money - free reporting and free consumer guides",
          "beforeYouCall": "Have the company's name, phone number and website, exactly what they promised you, what you paid, and how you paid it. Also report them to California's Department of Financial Protection and Innovation at 866-275-2677 or dfpi.ca.gov. That is the office that can act on a company working in your state.",
          "script": "Hi, my name is Leah, and I would like to report a company. They contacted me about my credit card debt and asked me to pay them money up front before they had done anything for me. I have the company's name and phone number here in front of me. Can you help me file a report, and can you tell me what else I should do to protect my bank account?",
          "priority": 3
        }
      ],
      "called": [],
      "createdAt": "2026-08-21T14:20:00Z"
    },
    {
      "id": "cs-3-food-oklahoma",
      "topic": "Food and Getting Around",
      "topicKey": "food",
      "suit": "heart",
      "city": "Midwest City",
      "state": "Oklahoma",
      "zip": "73110",
      "memberName": "Rachel",
      "problem": "I just moved to Oklahoma and I am feeling lost 73110 I have been trying to get food and it's too expensive when you have no car so what should I do?",
      "title": "Getting food in Midwest City with no car",
      "opening": "Rachel, moving to a brand new state where you don't know a single phone number is a lot to carry. Doing it with no car on top of that would leave anybody feeling lost. So let me take some of it off you. I spent the day looking up who helps in Midwest City and in Oklahoma County. Here is the honest headline: there is more here for you than you think, and some of these places will bring food to your door instead of making you find a way to get to them. You do not need to know the right words for any of this. You just need to make the first call.",
      "beforeYouStart": "Before you pick up the phone, put a few things in one spot: your Social Security number, a photo ID, a piece of mail with your Midwest City address on it, the date you moved in, proof of any money coming in (pay stubs, or your Social Security or pension letter), your rent amount, and one recent utility bill. Keep a pen and a notepad by the phone. Write down the name of every person you talk to. And Rachel, you never have to sound official. One sentence does the whole job: \"I just moved here, I'm having trouble getting food, and I don't have a car.\"",
      "watchOut": "Nobody real ever charges you a fee to apply for SNAP, WIC or food help. If a website or a person wants money to \"get your food stamps approved faster,\" that is a scam. Hang up. And once your EBT card comes, never give the card number or your PIN to anyone who calls, texts or emails about a problem with your case. Oklahoma Human Services will never ask you for your PIN. Thieves empty cards exactly that way.",
      "firstCall": {
        "orgId": "okdhs-snap",
        "why": "Most things on this list are help for a week or a month. SNAP is food money that lands on a card every single month. And in Oklahoma that card works online at Walmart, Amazon, ALDI and Homeland, so the groceries can come to your door. That takes some of the car problem off you too. It also takes the longest to come through, which is exactly why it goes first.",
        "whatToSay": "Hello, my name is Rachel. I just moved to Midwest City, Oklahoma, and I'd like some help applying for SNAP food benefits. I have very little money coming in right now, and I don't have a car, so I'd like to do as much of this by phone as I can. Can you help me start my application today? And can you tell me if my case can be looked at quickly? I think the word for that is expedited. One more thing before we hang up. Once I'm approved, I'd like to know how to use the card to order groceries online and have them delivered."
      },
      "plan": [
        {
          "title": "Today: start SNAP, without leaving the house",
          "body": "Call Oklahoma Human Services at 405-522-5050, or do it yourself at okdhslive.org. Read the script on the first card out loud, word for word. That is what it is there for. If money is very tight right now, use the word \"expedited\" on the call. That can put a card in your hands in about a week instead of a month. If the website starts to confuse you, stop. Call the SNAP Hotline at 1-877-760-0114 and let them fill it out with you. There is no prize for struggling through it alone."
        },
        {
          "title": "Today, second call: dial 211 and say \"I have no car\"",
          "body": "211 is free. A real person in Oklahoma answers, day or night, weekends too. They will look up food pantries and hot meal sites right inside ZIP 73110. But they will not think about the car unless you tell them. So say it in your first sentence, then ask straight out: \"Which of these deliver to me?\" Write down every name and number they give you."
        },
        {
          "title": "This week: get food that comes to you",
          "body": "Two things can arrive at your door. If you are 60 or older, call Areawide Aging Agency at 405-943-4344 and ask about home-delivered meals. Get your name on the list even if there is a wait, because a wait list still moves. Then call the Regional Food Bank at 405-972-1111 and ask two things: does a mobile pantry ever stop in Midwest City, and do they have a home delivery program for people who cannot get out. They do have one for housebound seniors, so ask about it by name."
        },
        {
          "title": "This week: one pantry you can actually reach",
          "body": "Mid-Del Food Pantry is at 322 N Midwest Blvd, right in your ZIP code. Call 405-732-3603 first and check they are open. They are usually open Monday, Wednesday and Friday, 10am to 3pm, closed noon to 1. Bring a photo ID and a piece of mail with your name and address on it. You can go once every 30 days. While you are on the phone with them, ask if anyone nearby delivers to people with no car. Local pantries often know."
        },
        {
          "title": "Then, and in two weeks: make the car problem smaller, and follow up",
          "body": "Call EMBARK at 405-235-7433 and ask them to plan one real trip with you, your street to a grocery store. Route 15 goes to Midwest City, so ask where it stops near you. Ask about discounted fares and about EMBARK Plus, their door-to-door van. Then, two weeks in, call Oklahoma Human Services again if you have not heard about SNAP. Cases sit still until somebody asks about them, and asking is not being a bother. It is how this works. Tick off each call on this sheet as you make it. You are not lost anymore, Rachel. You have a list."
        }
      ],
      "orgs": [
        {
          "id": "okdhs-snap",
          "name": "Oklahoma Human Services — SNAP Food Benefits",
          "url": "https://www.okdhslive.org",
          "phone": "405-522-5050",
          "address": "You do not need to go anywhere. Apply at okdhslive.org or by phone. If you would rather go in person, find your Oklahoma County office at oklahoma.gov/okdhs/contact-us.html",
          "plainWhat": "SNAP is what people used to call food stamps. It puts money on a card every month that you spend on groceries. You swipe it like a debit card and nobody in line can tell the difference. Here is the part that matters most for you: in Oklahoma that card also works online at Walmart, Amazon, ALDI and Homeland, so groceries can be brought to your house. One honest note — the card pays for the food, but not for the delivery fee.",
          "whoQualifies": "People with low income. There is no age limit and you do not need to have children. Because you just moved, you apply here in Oklahoma even if you had food stamps in your old state. The old case closes and a new one opens.",
          "area": "All of Oklahoma. Your case will be handled by an Oklahoma County office, which covers Midwest City.",
          "whenToApply": "Today. Applications are taken all year round. A normal decision takes up to 30 days. If you have almost nothing coming in, you can ask for expedited handling and get a card in about 7 days.",
          "freeServices": "Free help filling out the application, free replacement card, free nutrition classes",
          "moneyType": "Monthly food money on a card — not a loan, you never pay it back",
          "maxAmount": "The most one person can get is $298 a month. Most people get less than that. The amount depends on your income, your rent and your bills.",
          "beforeYouCall": "Have your Social Security number, a photo ID, your Midwest City address and move-in date, and proof of any money coming in (pay stubs, or your Social Security or pension letter). Also have your rent amount and a recent utility bill in front of you. Those two things can raise the amount you get.",
          "script": "Hello, my name is Rachel. I just moved to Midwest City, Oklahoma, and I'd like some help applying for SNAP food benefits. I have very little money coming in right now and I don't have a car, so I'd like to do as much of this by phone as I can. Can you help me start my application today, and can you tell me if my case can be looked at quickly? And once I'm approved, could someone explain how I use the card to order groceries online for delivery?",
          "priority": 1
        },
        {
          "id": "211-oklahoma",
          "name": "211 Oklahoma (answered by HeartLine)",
          "url": "https://unitedwayokc.org/211-immediate-help/",
          "phone": "Dial 211 — free, 24 hours a day",
          "address": "No office to visit. This is a phone line that covers Midwest City and all of Oklahoma County.",
          "plainWhat": "One free phone call, any hour of the day or night. A real person in Oklahoma looks up food pantries, hot meal sites, help with bills and rides in your exact ZIP code, 73110. They are the fastest way to find out which pantries near you deliver. If you ever cannot get through, the USDA National Hunger Hotline at 1-866-348-6479 does much the same thing on weekdays.",
          "whoQualifies": "Everyone. No income test, no paperwork, no forms, and no questions you need to be afraid of.",
          "area": "All of Oklahoma, including Midwest City",
          "whenToApply": "Any time, day or night, weekends and holidays included",
          "freeServices": "Free referrals to food pantries, meal sites, home delivery, rent and utility help, and transportation programs",
          "moneyType": "No money — free information and referrals",
          "maxAmount": "No money — free help",
          "beforeYouCall": "Have a pen and paper and write down every name and number. Then ask the one question that changes the answers you get: \"Which of these will deliver to me? I have no car.\" They will not think of it unless you say it out loud.",
          "script": "Hi, my name is Rachel. I just moved to Midwest City, ZIP 73110, and I'm having a hard time getting food. I don't have a car and I don't know anybody here yet. Could you help me find food pantries and meal programs close to me? And please, could you tell me which ones deliver to the house, and which ones I could reach on a bus? I'd also like to know about any program that helps with rides.",
          "priority": 1
        },
        {
          "id": "mid-del-food-pantry",
          "name": "Mid-Del Food Pantry",
          "url": "https://www.middelfoodpantry.com/",
          "phone": "405-732-3603",
          "address": "322 N Midwest Blvd, Midwest City, OK 73110 — this one is right in your ZIP code",
          "plainWhat": "A local food pantry in Midwest City that has been feeding people in eastern Oklahoma County since 1984. You walk in, show your ID and a piece of mail, and they give you groceries. No long form, no interview about your life. Of everything on this sheet, this is the closest food to your front door.",
          "whoQualifies": "People who live in the ZIP codes they serve, and 73110 is one of them. Walk-ins are welcome. You can come once every 30 days.",
          "area": "Eastern Oklahoma County, including Midwest City, Del City, Choctaw, Spencer and Nicoma Park",
          "whenToApply": "Usually Monday, Wednesday and Friday, 10am to 3pm, closed noon to 1. Always call first, because hours can change and food can run short.",
          "freeServices": "Free groceries, and staff who know which other pantries and church programs nearby are open this week",
          "moneyType": "No money — free groceries",
          "maxAmount": "No money — usually several days of food per visit, free",
          "beforeYouCall": "Have a photo ID and a piece of mail with your name and Midwest City address on it. If you have not gotten mail here yet, say so on the phone and ask what else they will take instead. And ask them whether anyone nearby delivers, because local pantries usually know who does.",
          "script": "Hello, my name is Rachel and I live in Midwest City, ZIP 73110. I just moved here and I'm having trouble affording food. Could you tell me when you are open this week and what I need to bring with me? I don't have a car, so I also wanted to ask if you know of anyone close by who delivers food to people without transportation.",
          "priority": 1
        },
        {
          "id": "regional-food-bank",
          "name": "Regional Food Bank of Oklahoma",
          "url": "https://www.regionalfoodbank.org/find-food/",
          "phone": "405-972-1111",
          "address": "3355 S Purdue Ave, Oklahoma City, OK 73179 — but do not travel there. They supply the pantries. You go to a partner pantry or a mobile stop near Midwest City, which they will help you find.",
          "plainWhat": "This is the big warehouse that supplies most food pantries in central and western Oklahoma, including the ones near you. Their Food Finder shows which pantry is closest and when it is open. They also run mobile pantries, which is a truck that parks in a neighborhood and hands out groceries. They have a monthly box of food for people 60 and over, and a home delivery program for older people who cannot get out of the house.",
          "whoQualifies": "Anyone who needs food. Most partner pantries only ask your name, your address, and how many people live with you. The monthly senior food box and the home delivery program are for people 60 and older with low income.",
          "area": "53 counties across central and western Oklahoma, including Oklahoma County and Midwest City",
          "whenToApply": "Any time. Pantries keep set hours and some run out, so always call before you make the trip.",
          "freeServices": "Free groceries, free monthly senior food box, mobile pantry stops, home delivery for housebound seniors, free help signing up for SNAP",
          "moneyType": "No money — actual food",
          "maxAmount": "No money — usually several days of groceries per visit, free",
          "beforeYouCall": "Have your ZIP code, 73110, ready. Ask three things: which pantry is truly closest to me, does a mobile pantry ever stop in Midwest City, and do you have a home delivery program I might qualify for. If you are 60 or older, ask about the monthly senior food box by name.",
          "script": "Hello, my name is Rachel and I live in Midwest City, ZIP 73110. I just moved here and I'm having trouble affording food. I don't have a car. Could you help me find the closest pantry I can actually get to? And could you tell me if you have a home delivery program, or a pantry near me that delivers? I'd also like to ask about the monthly food box for older adults and whether I qualify.",
          "priority": 1
        },
        {
          "id": "areawide-aging",
          "name": "Areawide Aging Agency — meals that come to you",
          "url": "https://www.areawideaging.org",
          "phone": "405-943-4344 — or the national Eldercare Locator at 1-800-677-1116",
          "address": "4101 Perimeter Center Dr, Suite 310, Oklahoma City, OK 73112. Call first. They set everything up by phone, so you do not need to travel to them.",
          "plainWhat": "If you are 60 or older, this is the group that arranges hot meals delivered to your door, what most people know as Meals on Wheels. They also run senior centers where you can eat a hot lunch with other people, and some centers send a van to pick you up. Of everything on this sheet, this is the clearest answer to \"I have no car.\"",
          "whoQualifies": "People 60 and older in Oklahoma, Cleveland, Canadian or Logan County. Meals at home are for people who have trouble getting out or cooking for themselves. If you are not 60 yet, call anyway and ask them who helps someone your age.",
          "area": "Oklahoma, Cleveland, Canadian and Logan counties. Midwest City is in Oklahoma County, so you are covered.",
          "whenToApply": "Any time, Monday to Friday, 8am to 5pm. There is sometimes a waiting list, which is exactly why you want your name on it now rather than later.",
          "freeServices": "Meals delivered to the home, hot lunches at senior centers, free advice about benefits, help finding rides",
          "moneyType": "No money — meals, given free, with a chance to donate if you can",
          "maxAmount": "No money — meals most days of the week, at no set cost to you",
          "beforeYouCall": "Know your date of birth and your address. Be honest about how hard it is for you to shop and cook. That honesty is what decides whether meals come to your home or you are only offered the sit-down lunch. Ask if there is a waiting list and how long it is.",
          "script": "Hello, my name is Rachel and I live in Midwest City. I recently moved here and I'm having a hard time getting food because I don't have a car. I'd like to ask about your meal programs for older adults, both the meals that are delivered to the home and the lunches at the senior center. Could you tell me if I qualify, and whether there is any program that gives me a ride to the center? And if I'm not old enough yet, could you point me to who else might help?",
          "priority": 2
        },
        {
          "id": "hunger-free-ok",
          "name": "Hunger Free Oklahoma — SNAP Hotline and Double Up Oklahoma",
          "url": "https://www.hungerfreeok.org/resources/snap/",
          "phone": "SNAP Hotline: 1-877-760-0114 (Monday to Friday, 8am to 7pm)",
          "address": "No walk-in office. They work with you by phone and online.",
          "plainWhat": "An Oklahoma group whose whole job is making sure people can get food. Two things they do are worth your time. Their SNAP Hotline will sit with you on the phone and help you fill out the application so it does not get turned down over a small mistake. And they run Double Up Oklahoma, which matches your SNAP money when you buy fruit and vegetables at stores and farmers markets that take part. Spend $10, get $10 more of produce, up to $20 a day.",
          "whoQualifies": "Anyone applying for SNAP can get help with the application. Double Up is for anyone holding a SNAP card.",
          "area": "All of Oklahoma. Help is offered in English, Spanish and Zomi.",
          "whenToApply": "Any time, but best before you finish your SNAP application",
          "freeServices": "Free one-on-one help with the SNAP application, free list of Double Up stores, free plain answers about food programs",
          "moneyType": "Matches the SNAP money you already have, on fruit and vegetables",
          "maxAmount": "Up to $20 extra a day on fruit and vegetables — ask which stores near you take part",
          "beforeYouCall": "Ask which Double Up stores are near 73110, and which of those sit on an EMBARK bus route. There is no point earning extra produce money if the ride there costs you the difference.",
          "script": "Hi, my name is Rachel. I just moved to Midwest City and I'm applying for SNAP. I'd like some help making sure I fill the application out correctly, because I don't want to be turned down over a mistake. I'd also like to ask about the Double Up Oklahoma program. Which stores near ZIP 73110 take it, and which of those could I reach without a car?",
          "priority": 2
        },
        {
          "id": "community-action-okc",
          "name": "Community Action Agency of Oklahoma City and Oklahoma/Canadian Counties",
          "url": "https://www.caaofokc.org",
          "phone": "405-232-0199",
          "address": "319 SW 25th St, Oklahoma City, OK 73109. If you ever cannot reach them, you can find your local agency at communityactionpartnership.com/find-a-cap",
          "plainWhat": "Your local Community Action Agency. These were set up so a household with low income can go to one place for several kinds of help, instead of chasing ten different offices. Food help, help with the light bill, job help, and sometimes bus passes. Because one person there handles many programs, a single call often turns up things you would never have found on your own.",
          "whoQualifies": "Households with low income in Oklahoma and Canadian counties. The income limit is different for each program, so do not talk yourself out of it before you call. Let them run the numbers.",
          "area": "Oklahoma County and Canadian County. Midwest City is included.",
          "whenToApply": "Any time. The utility bill program, called LIHEAP, only opens in set windows during the year, so ask when the next one starts and write it on your calendar.",
          "freeServices": "Food help, help with utility bills, job help, help applying for other programs, sometimes help with transportation",
          "moneyType": "Help paid straight to your bills, plus free services",
          "maxAmount": "The utility help changes each year and depends on your income and your bill. Ask them what it is right now.",
          "beforeYouCall": "Have a photo ID, Social Security numbers for everyone in the house, proof of all money coming in for the last 30 days, your lease, and a recent utility bill. Then ask the question that opens the rest of the door: \"What else do you have that I haven't asked about?\"",
          "script": "Hello, my name is Rachel and I just moved to Midwest City. I'm having a hard time. Food is expensive and I don't have a car to get to a store. I'd like to know what programs you have that I might qualify for. I'm interested in food help and help with my utility bill, and I'd like to ask whether you have any assistance with transportation or bus passes. Could you tell me what to bring, and whether any of this can be done over the phone?",
          "priority": 2
        },
        {
          "id": "embark-transit",
          "name": "EMBARK — Oklahoma City area buses",
          "url": "https://www.embarkok.com",
          "phone": "405-235-7433 (405-235-RIDE)",
          "address": "Downtown Transit Center, 300 SW 7th St, Oklahoma City, OK 73109 — but you do not need to go there. Call them instead.",
          "plainWhat": "The public bus system for the Oklahoma City area. Route 15 is the one that goes to Midwest City, so ask them where it stops near your street. There are discounted fares for older adults, people with a Medicare card, and people with a disability. There is also EMBARK Plus, a door-to-door van for people who cannot ride a regular bus because of a disability. And Share-A-Fare gives older adults and people with disabilities cheaper taxi rides.",
          "whoQualifies": "Anyone can ride the bus. The discounted fare card is something you apply for. EMBARK Plus and Share-A-Fare are for people with a disability or older adults, and they need an application.",
          "area": "Oklahoma City and nearby towns. Route 15 serves Midwest City, but bus service there is limited, so ask exactly what reaches 73110 before you count on it.",
          "whenToApply": "Any time. The discounted fare and EMBARK Plus applications take a couple of weeks to go through, so start now. Their phone line is open Monday to Friday and Saturday.",
          "freeServices": "Free trip planning over the phone, free route maps, discounted fare cards, door-to-door service for those who qualify",
          "moneyType": "No money — a discount on your fares",
          "maxAmount": "No money — cheaper rides, plus door-to-door service if you qualify",
          "beforeYouCall": "Write down your two nearest cross streets and the name of the grocery store you want to reach, so they can plan the real trip with you instead of talking in general. If you are an older adult, on Medicare, or have a disability, ask them to mail you the application so you do not have to travel downtown just to pick up a form.",
          "script": "Hi, my name is Rachel. I just moved to Midwest City, ZIP 73110, and I don't have a car. I need help working out how to get to a grocery store on the bus. Could you plan that trip with me? I'd also like to ask about the discounted fare program and about EMBARK Plus, the door-to-door service. Could you tell me if I qualify, and mail me the application so I don't have to come downtown?",
          "priority": 2
        },
        {
          "id": "soonercare-soonerride",
          "name": "SoonerCare and SoonerRide (Oklahoma Medicaid and its free rides)",
          "url": "https://oklahoma.gov/ohca/individuals/soonerride.html",
          "phone": "SoonerRide rides: 1-877-404-4500 — SoonerCare helpline: 1-800-987-7767",
          "address": "All by phone. Nobody needs you to come to an office.",
          "plainWhat": "If you are on SoonerCare, which is Oklahoma's Medicaid, you can get a free ride to and from your medical appointments. A car or van comes to your house. It will not take you to the grocery store, but it means doctor visits stop eating the money that should be buying food. If you are not on SoonerCare yet, that same helpline will tell you whether you qualify now that you live here.",
          "whoQualifies": "SoonerCare members who have no other way to get to a covered medical appointment. Adults aged 19 to 64 with low income can qualify for SoonerCare in Oklahoma.",
          "area": "All of Oklahoma",
          "whenToApply": "Apply for SoonerCare any time. Book each ride at least three business days before the appointment.",
          "freeServices": "Free rides to medical, dental and pharmacy visits; free health coverage if you qualify",
          "moneyType": "No money — free health coverage and free rides",
          "maxAmount": "No money — free rides to covered medical visits, as often as you need them",
          "beforeYouCall": "Have your SoonerCare ID number if you already have one, plus the doctor's full name, address and phone, and the exact date and time of the appointment. Call at least three business days ahead or they may not be able to arrange the ride.",
          "script": "Hi, my name is Rachel and I live in Midwest City. I don't have a car. I recently moved to Oklahoma and I'd like to know if I qualify for SoonerCare health coverage here. And if I do, I'd like some help setting up SoonerRide so I can get to my medical appointments. Could you walk me through what I need, and tell me how far ahead I have to call to book a ride?",
          "priority": 3
        },
        {
          "id": "oklahoma-wic",
          "name": "WIC — OKC-County Health Department, Midwest City clinic",
          "url": "https://occhd.org/wic/",
          "phone": "405-425-4384, then press option 3 (Midwest City clinic)",
          "address": "1701 S Air Depot Blvd, Midwest City, OK 73110 — this clinic is in your own ZIP code. Usually open Monday to Friday, 8am to 4:30pm, closed Wednesdays. Call first.",
          "plainWhat": "WIC gives free healthy food on a card. Milk, eggs, cereal, beans, peanut butter, fruit and vegetables. It is only for women who are pregnant or who recently had a baby, and for children under 5. If you have a young child or a grandchild living with you, this is real food you should not leave on the table. If you don't, skip this card. It is not for you, and that is fine.",
          "whoQualifies": "Women who are pregnant, recently pregnant or breastfeeding, and children under 5, in households with modest income. You can be working and still qualify. Grandparents and other caregivers can apply for a child in their care.",
          "area": "All of Oklahoma. The Midwest City clinic serves your area.",
          "whenToApply": "Any time. It is not first-come-first-served and the money does not run out.",
          "freeServices": "Free specific groceries every month, free nutrition advice, free breastfeeding support, referrals to other programs",
          "moneyType": "Monthly food benefits on a card, on top of SNAP",
          "maxAmount": "The food package is different for each person. For a young child it is often worth around $50 to $80 a month.",
          "beforeYouCall": "This one needs one visit in person, because the child has to be weighed and measured. The good news is the clinic is in 73110. When you call, ask what to bring, and say you have no car so they can tell you the best way to get there.",
          "script": "Hello, my name is Rachel and I live in Midwest City, ZIP 73110. I'd like to ask about the WIC program for a young child in my household. I recently moved to Oklahoma and I'm not sure what we qualify for. Could you tell me if we're eligible, and what I need to bring to the first appointment? I also don't have a car, so I'd like to ask if there's any help getting to the clinic.",
          "priority": 3
        }
      ],
      "called": [],
      "createdAt": "2026-08-09T14:20:00Z"
    },
    {
      "id": "cs-4-housing-houston",
      "topic": "Rent, Eviction and Housing Help",
      "topicKey": "housing",
      "suit": "heart",
      "city": "Houston",
      "state": "Texas",
      "zip": "77044",
      "memberName": "Alma",
      "problem": "Hello am new here I live in Texas, I need assistance with a car for my daughter she is a student and goes to college. She lives on her own and needs assistance with a car and to pay rent",
      "title": "Rent help for your daughter, and a way to get around",
      "opening": "Alma, welcome, and thank you for saying it so plainly. Your daughter is in college here in Texas, living on her own. She needs help keeping her apartment, and she needs a way to get around. I went looking for both. Here is the honest picture. There is real help for her rent, and the fastest of it is sitting right inside her own college, where hardly any student thinks to ask. The car is harder, and I will be straight with you about that too. I would rather tell you the truth than send you chasing something that is not there.",
      "beforeYouStart": "Put these next to the phone before you dial: your daughter's full name and address, her landlord's name and phone number, her student ID number and the name of her college, and the exact amount she owes and the date it is due. If a late notice or a court paper has come, hold it in your hand. The date printed on it decides who can help her and how fast. One more thing, the house rule we all use here. Ask for \"help\", \"assistance\", or \"a program\". Never say \"grant\" or \"free money\". The person answering the phone will treat you very differently.",
      "watchOut": "The big COVID rent programs are over. Texas Rent Relief closed in 2023, and the Houston and Harris County emergency rent program has spent its money. So if anyone offers to \"get you approved for rent relief\" for a fee, it is a scam. Never pay a fee up front, never send a gift card, and never give anyone your bank login. The same goes double for any website promising a free car. Every single thing on this sheet is free to ask for.",
      "firstCall": {
        "orgId": "college-emergency-aid",
        "why": "This is the fastest money on the whole sheet, and it is the one almost nobody asks for. Colleges keep a quiet emergency fund for exactly this, a student about to lose her apartment, and they can often pay it out in a few days. The city and county programs have waiting lists and closed windows.",
        "whatToSay": "Hello, my name is Alma. My daughter is a student with you, and she is right here on the line and gives her permission for me to speak for her. She has fallen behind on her rent and we are worried. I would like to ask two things. First, does the college have an emergency assistance program or a student emergency fund she can apply to? And second, can we ask financial aid to look at her file again, because her situation has changed since she filled out her paperwork. Who do we need to speak with, and what should she bring?"
      },
      "plan": [
        {
          "title": "Today, have your daughter ask her own college first",
          "body": "Do this one together, with her on the line, because the college is only allowed to talk to her. Ask for the emergency fund. Then ask financial aid to look at her paperwork again, now that her money situation has changed. This is the fastest help there is, and these funds run low near the end of every semester, so today is better than next week."
        },
        {
          "title": "Today or tomorrow, dial 2-1-1 and write down every name they give you",
          "body": "One free call, a real person, any hour of the day. Give them your daughter's ZIP code, not yours, so they search where she actually lives. Ask which agencies still have rent money open this month. Write the names down yourself as they say them. That list is your next set of phone calls."
        },
        {
          "title": "This week, work the Houston list and get a free counselor on your side",
          "body": "Call BakerRipley, Catholic Charities and the Salvation Army, in that order. Ask each one the same question: is a rent program open right now, and if not, when does it open? Then call the free housing counselor line at 1-800-569-4287 and make a real appointment. That counselor costs you nothing and often knows which local fund still has money this week."
        },
        {
          "title": "If any paper comes from the landlord or the court, stop and call the free lawyers",
          "body": "In Texas an eviction moves in days, not months. The moment a notice is taped to her door or a court paper arrives, call Lone Star Legal Aid before anything else. A free lawyer can often buy her weeks of time, or find a mistake the landlord made. And she must never miss a court date, even while she is waiting to hear back from someone else."
        },
        {
          "title": "Then the car, and the honest truth about it",
          "body": "There is no pot of grant money for cars, Alma, and I would rather tell you that than let you chase it. Here is what is real. Her student ID gets her half price bus and train fares from METRO, and she can set that up this week. On the Road Lending is a real Texas nonprofit that helps people buy a dependable used car with a fair, low interest loan and free coaching. One thing to know first: they ask for take home pay of about $2,000 a month, so a small part time job may not be enough yet. Treat the car as the goal for later, once the rent is steady."
        }
      ],
      "orgs": [
        {
          "id": "college-emergency-aid",
          "name": "Her College's Financial Aid Office and Student Emergency Fund",
          "url": "https://studentaid.gov",
          "phone": "Her college's own main number. Federal Student Aid can also help at 1-800-433-3243",
          "address": "On her campus. Ask at the front desk for the Financial Aid Office and for the Dean of Students office.",
          "plainWhat": "Almost every college keeps a pot of money for students who hit a wall, like a late rent, a car that died, or a shut off notice. It goes by different names: emergency aid, a student emergency fund, or a dean's fund. It is not a loan. A lot of it goes unused every year, because students do not know to ask for it.",
          "whoQualifies": "Enrolled students. Most colleges do not ask you to prove a disaster, only that she is enrolled and short of money. Having her financial aid paperwork on file helps, but it is often not required.",
          "area": "Her own campus. Every public college around Houston has some version of this, including Houston Community College, Lone Star College, the University of Houston and Texas Southern University.",
          "whenToApply": "Right now, this week. Most of these funds are first come, first served, and they run low near the end of each semester.",
          "freeServices": "Free help filling in the form, a free second look at her financial aid, free referral to the campus food pantry and to campus housing staff",
          "moneyType": "Emergency aid, money she does not pay back",
          "maxAmount": "Often $300 to $1,500, and sometimes paid within a few days. Every college sets its own limit, so ask.",
          "beforeYouCall": "Student privacy law means the college can only speak to your daughter, not to you, unless she says on the call that she gives permission. So make this call together, with her on the line, and have her student ID number ready.",
          "script": "Hello, my name is Alma. My daughter is a student with you, and she is here on the line and gives her permission for me to speak for her. She has fallen behind on her rent. Does the college have an emergency assistance program or a student emergency fund she can apply to? And can we also ask financial aid to look at her file again, because her money situation has changed since she filled out her paperwork. Who do we need to speak with, and what should she bring?",
          "priority": 1
        },
        {
          "id": "211-texas",
          "name": "2-1-1 Texas (the free statewide help line)",
          "url": "https://www.211texas.org",
          "phone": "2-1-1, or 1-877-541-7905",
          "address": "Phone and website only. There is no office to visit.",
          "plainWhat": "One free phone number that knows the rent, utility, food and transport programs near your daughter's address. A real person answers, day or night, and tells you who actually has money right now. That changes from week to week, which is why this call is worth making.",
          "whoQualifies": "Anyone. There is no income test just to call, and there is no wrong question.",
          "area": "All of Texas. Give them your daughter's ZIP code rather than yours, so they search where she lives.",
          "whenToApply": "Any time, 24 hours a day. The first few days of the month are best, because that is when many local funds get refilled.",
          "freeServices": "Free referrals to rent help, utility help, food, transportation and free legal help",
          "moneyType": "No money directly. They point you to the places that have it.",
          "maxAmount": "No money, free help finding it",
          "beforeYouCall": "Have your daughter's ZIP code and the exact amount she owes ready. Ask them to text or email you the list, and write the names down yourself as they say them, because those are the calls you make next.",
          "script": "Hello, my name is Alma. I am calling for my daughter. She is a college student here in Texas, living on her own, and she has fallen behind on her rent. I have her ZIP code here, and it is different from mine. Could you tell me which agencies near her still have rent assistance open this month, and which ones are taking new people? I would also like to know about any help with transportation. I will write them down. Thank you.",
          "priority": 1
        },
        {
          "id": "bakerripley",
          "name": "BakerRipley (Harris County's largest community agency)",
          "url": "https://www.bakerripley.org",
          "phone": "713-667-9400. You can also dial 2-1-1 and ask for BakerRipley.",
          "address": "Main office at 4450 Harrisburg Blvd, Houston, TX 77011. They run service sites all over Harris County, listed at bakerripley.org/locations.",
          "plainWhat": "This is the main agency that hands out Harris County and City of Houston help with rent and utility bills. When Houston has rent money to give out, this is usually where it lands. They also do free tax preparation and free help signing up for benefits.",
          "whoQualifies": "Low income Harris County residents. They usually want to see that the hardship is real, like a late notice, a shut off notice, or a drop in income, and that she can keep paying the rent going forward.",
          "area": "All of Harris County, including Houston and ZIP 77044.",
          "whenToApply": "Their programs open and close in windows, and they fill up fast. If nothing is open today, your job on this call is to get her on the list for the next one.",
          "freeServices": "Free case worker, free help signing up for benefits, free tax preparation",
          "moneyType": "Rent and utility help, paid straight to the landlord or the power company",
          "maxAmount": "Varies by program. When a window is open it is often one or two months of rent.",
          "beforeYouCall": "Ask it straight out: is a rent assistance program open right now, and if not, when does the next one open and how does she get on the list? Do not hang up without that answer. The money goes to the landlord and never to her, so have his name, phone number and mailing address in front of you.",
          "script": "Hello, my name is Alma. I am calling about assistance with rent for my daughter. She is a college student living on her own here in Harris County, and she has fallen behind. Is there a rent assistance program open right now that she can apply to? If it is not open, could you tell me when it opens and how she gets on the list to be told? I have her landlord's information here if that helps.",
          "priority": 1
        },
        {
          "id": "hud-housing-counselor",
          "name": "Free HUD-Approved Housing Counselor",
          "url": "https://www.consumerfinance.gov/find-a-housing-counselor/",
          "phone": "1-800-569-4287",
          "address": "Free counseling offices all around Houston. The 800 number matches you to the closest one to her ZIP code, or you can search the map at the link above.",
          "plainWhat": "A trained housing adviser whose time is already paid for by the government, so it costs you nothing. They look at the whole picture with you, tell your daughter exactly what her rights are as a renter in Texas, and often know which local fund still has money this week. Nobody is selling you anything.",
          "whoQualifies": "Anyone who rents or owns a home. There is no income limit for the counseling itself. Your daughter can get her own counselor near where she lives.",
          "area": "Nationwide. The 800 number finds an approved agency near her address.",
          "whenToApply": "Any time, but much better before a court date is set than after.",
          "freeServices": "Free one on one counseling, free renting and eviction advice, free budget help, free referrals to local money",
          "moneyType": "No money directly. Free expert help, and they know where the money is.",
          "maxAmount": "No money, but advice that people pay hundreds of dollars an hour for",
          "beforeYouCall": "Say the words \"rental counseling\" out loud. Some agencies mostly handle mortgages, and you want the one that works with renters. Ask for an appointment rather than settling for a quick answer on the phone. The sit down is where the real help happens.",
          "script": "Hello, my name is Alma. I am looking for a housing counselor for my daughter. She rents an apartment here in Texas, she is a college student, and she is behind on her rent. Do you do rental counseling, and could we make an appointment? We would like someone to look at her situation, tell her what her rights are, and help us find any local assistance that is still open. Is there any cost to us?",
          "priority": 1
        },
        {
          "id": "lone-star-legal-aid",
          "name": "Lone Star Legal Aid, free eviction lawyers",
          "url": "https://www.lonestarlegal.org",
          "phone": "1-800-733-8394. You can also find help at texaslawhelp.org.",
          "address": "Houston office serving Harris County. Call the intake line first, do not just turn up.",
          "plainWhat": "Free lawyers for people who cannot pay for one. If a paper has been taped to her door, or a court date has been set, they can often stop it, buy her weeks of time, or find a mistake the landlord made. In Texas an eviction can move in days rather than months, so this call cannot wait.",
          "whoQualifies": "Low income Texans. A student with little or no income will usually qualify.",
          "area": "72 counties across East and Southeast Texas, including Harris County and Houston.",
          "whenToApply": "The same day any notice or court paper arrives. Do not wait for the hearing date to come around.",
          "freeServices": "Free legal advice, free representation in eviction court, free help answering court papers",
          "moneyType": "No money. Free legal help, which can be worth thousands.",
          "maxAmount": "No money, a free lawyer",
          "beforeYouCall": "Have the actual paper in your hand and read them the date printed on it. That date decides how fast they have to move. And whatever else happens, she must never miss a court date, even if she is still waiting to hear back from someone.",
          "script": "Hello, my name is Alma. My daughter is a college student renting an apartment in Harris County, and she has had a notice from her landlord about being behind on rent. I have the paper right here and I can read you the date on it. Could someone look at this and tell her what her rights are, and whether she qualifies for free legal help? I want to make sure she does not miss anything important.",
          "priority": 2
        },
        {
          "id": "catholic-charities-houston",
          "name": "Catholic Charities of the Archdiocese of Galveston-Houston",
          "url": "https://catholiccharities.org",
          "phone": "713-526-4611",
          "address": "Main office at 2900 Louisiana St, Houston, TX 77006. Call the main number and ask which location covers her ZIP code.",
          "plainWhat": "A large Houston charity that helps people who are about to lose their home. You do not have to be Catholic and you do not have to belong to any church. They can sometimes pay part of the rent straight to the landlord, and they also give out food and clothing.",
          "whoQualifies": "Low income households around Houston who are in a real emergency. There is no religious requirement of any kind.",
          "area": "Ten counties around Houston and Galveston, including all of Harris County.",
          "whenToApply": "Call in the first business days of the month. Their rent money is set month by month and it goes fast.",
          "freeServices": "Free case worker, free food pantry, free clothing, free referrals",
          "moneyType": "Emergency rent help, paid directly to the landlord",
          "maxAmount": "Usually part of one month's rent. Often a few hundred dollars, and it depends on what they have left that month.",
          "beforeYouCall": "They often only take rent calls during set hours on set days, and the line fills up. If today is not the day, ask exactly which day and what time to call back, write it down, and call at that exact time. Have proof of her income and the late notice ready.",
          "script": "Hello, my name is Alma. I am calling to ask about assistance with rent. My daughter is a college student living on her own here in the Houston area, and she has fallen behind. Is there a program that could help with part of it? If your rent line is not open today, could you tell me the exact day and time I should call back? I will have her paperwork ready.",
          "priority": 2
        },
        {
          "id": "salvation-army-houston",
          "name": "The Salvation Army, Greater Houston",
          "url": "https://www.salvationarmyusa.org",
          "phone": "1-800-725-2769 (1-800-SAL-ARMY)",
          "address": "Community centers around Houston. Use \"Find Your Local Salvation Army\" on their website with her ZIP code, or ask 2-1-1 which center covers her.",
          "plainWhat": "Neighbourhood centers that keep a small emergency fund for rent, utilities and food. They can often move quicker than the big agencies, and they talk to you like a person and not a case number. You do not have to attend their church.",
          "whoQualifies": "Anyone in a genuine emergency. It depends on their local rules and on how much money that center still has left that month.",
          "area": "Nationwide, with several centers in and around Houston.",
          "whenToApply": "Early in the month and early in the day. Their funds refill monthly and empty quickly.",
          "freeServices": "Free food boxes, free help with utility bills, free case work, sometimes help with clothing and school costs",
          "moneyType": "A small emergency rent or utility payment, made to the landlord or the power company",
          "maxAmount": "Usually up to a few hundred dollars",
          "beforeYouCall": "Ask first which center covers your daughter's ZIP code. They are strict about their boundaries, and calling the wrong one costs you a day. Then ask whether they take appointments or walk ins, and what time the line opens.",
          "script": "Hello, my name is Alma. I am calling to ask whether you have a program that helps with rent. My daughter is a college student living on her own, and she is short on this month's rent. I have her ZIP code here. Does your center cover that area? And if you do help with rent, does she need an appointment or should she come in, and what should she bring with her?",
          "priority": 2
        },
        {
          "id": "gulf-coast-community-services",
          "name": "Gulf Coast Community Services Association",
          "url": "https://www.gccsa.org",
          "phone": "713-393-4700",
          "address": "Main office at 9320 Kirby Dr, Houston, TX 77054. They have several centers around Harris County, so call the main line and ask which office covers her ZIP code.",
          "plainWhat": "This is one of Harris County's community action agencies. Their strongest help is with the electric bill, through a state program called CEAP. That matters more than it sounds. Money she does not spend on lights and air conditioning is money that can go to the rent. Ask them what else they have open while you have them on the phone.",
          "whoQualifies": "Low income Harris County households. There are income limits, and she will need to show her bill, her ID and proof of what she earns.",
          "area": "Harris County and the Houston area.",
          "whenToApply": "Energy help runs all year, but the money is tightest in summer and winter. Apply as soon as she has a bill in her hand.",
          "freeServices": "Free case worker, free help applying for benefits, free early childhood programs for families",
          "moneyType": "Help with the electric bill, paid straight to the power company",
          "maxAmount": "Varies. Often a few hundred dollars toward the electric bill.",
          "beforeYouCall": "Have her most recent electric bill, her photo ID and proof of her income ready. Ask which of their offices covers her ZIP code, and whether she can apply online instead of coming in.",
          "script": "Hello, my name is Alma. I am calling for my daughter. She is a college student living on her own in Harris County, and she is behind on her rent and struggling with her bills. Could she get assistance with her electric bill? And is there any other program open right now that she could apply for? I have her ZIP code here.",
          "priority": 2
        },
        {
          "id": "houston-food-bank-campus-pantry",
          "name": "Houston Food Bank and her campus food pantry",
          "url": "https://www.houstonfoodbank.org/find-help/",
          "phone": "713-223-3700",
          "address": "535 Portwall St, Houston, TX 77029. Free pantries all over Houston, listed on the Find Help map at houstonfoodbank.org. Also ask her college where its own pantry is.",
          "plainWhat": "Free groceries, every week, at no cost and with no shame in it. Money she does not spend on food is money that can go to the rent. Many Texas colleges also run their own free food pantry right on campus. She can walk in with her student ID and walk out with bags.",
          "whoQualifies": "Anyone who needs food. Most pantries only ask for a name and how many people live in the home. Campus pantries usually only want to see a student ID.",
          "area": "Houston and 18 surrounding counties. The campus pantry is on her own campus.",
          "whenToApply": "This week. There is nothing to apply for. She just turns up during opening hours.",
          "freeServices": "Free groceries, free help applying for SNAP food benefits, free referrals to other help",
          "moneyType": "No money, but food she does not have to buy",
          "maxAmount": "No money. For one person this is often $100 to $300 a month she keeps in her pocket.",
          "beforeYouCall": "Ask two things: where the closest free pantry to her address is, and whether someone there can help her apply for SNAP food benefits. College students have extra rules for SNAP, so not every student qualifies, but plenty do and it is worth the question.",
          "script": "Hello, my name is Alma. My daughter is a college student living on her own and money is very tight this month. Could you tell me where the closest free food pantry to her ZIP code is, and what hours it is open? I would also like to ask whether someone there can help her apply for food benefits. I have heard some students can qualify and I do not want her to miss out.",
          "priority": 3
        },
        {
          "id": "getting-around-car-and-transit",
          "name": "Getting her moving: student fare card and car loan help",
          "url": "https://ontheroadlending.org",
          "phone": "METRO Houston: 713-635-4000. For anything else, dial 2-1-1 and say \"I need help with transportation\".",
          "address": "On the Road Lending works online across Texas at ontheroadlending.org. METRO has RideStore locations around Houston.",
          "plainWhat": "I will be honest with you, Alma. Free cars are rare, and most websites promising one are not real. Here is what is real. METRO gives college students a Student METRO Q fare card that cuts bus and train fares in half, and most students never find out about it. And On the Road Lending is a Texas nonprofit that helps people buy a dependable used car with a fair, low interest loan and free coaching along the way.",
          "whoQualifies": "The METRO student fare card only needs proof that she is enrolled. On the Road Lending works with people who have little or damaged credit, but they do ask for take home pay of about $2,000 a month, so a small part time job may not be enough yet. If that is the case, treat this as the goal for later.",
          "area": "METRO covers Houston and much of Harris County. On the Road Lending serves Texas.",
          "whenToApply": "The fare card she can sort out this week. The car takes weeks, not days, so start that conversation once the rent is steady.",
          "freeServices": "Free car buying coaching, free credit help, and a student fare card that halves her travel cost",
          "moneyType": "A low interest car loan, not a gift. There is no grant money for cars, and I would rather you heard that from me.",
          "maxAmount": "A loan large enough for a dependable used car, paid back monthly. The student fare card cuts her bus and rail cost in half.",
          "beforeYouCall": "Before anything else, have her ask METRO or her college one question: how do I get the Student METRO Q fare card? That is the fastest win on this whole page. And never, ever pay a fee to a website promising a free car. That is always a scam.",
          "script": "Hello, my name is Alma. My daughter is a college student in the Houston area and she has no car, which is making it very hard for her to get to class and to work. I am calling to ask what transportation assistance there is near her. Is there a discounted fare card for college students, and how does she get one? I have her ZIP code here. I would be grateful for any names you can give me, and I will write them down.",
          "priority": 3
        }
      ],
      "called": [],
      "createdAt": "2026-07-21T14:20:00Z"
    },
    {
      "id": "cs-5-invention-idaho",
      "topic": "Money for an Invention",
      "topicKey": "invention",
      "suit": "spade",
      "city": "Boise",
      "state": "Idaho",
      "zip": "83702",
      "memberName": "Thomas",
      "problem": "I have invented something and a company in Pennsylvania is going to do the engineering work on it, but they want a seed fee up front to start the R&D and I do not have that kind of money. I dont know where to even start looking.",
      "title": "Money to build your invention, and who to call first",
      "opening": "Thomas, you already did the hard part - you made something new. Now a company in Pennsylvania wants a fee up front before they will start, and you do not have it. That is a rotten place to be standing, and you are not the first person to stand there. Here is what I found: free advisors ten minutes from your house who will read that offer with you, real programs that pay for work like yours, and one thing you should check before you send that company a single dollar.",
      "beforeYouStart": "Every call on this sheet is free, and nobody on it will ask you for money. Put three things next to the phone before you dial: the email or quote from the Pennsylvania company showing exactly what the fee pays for, one page in your own words saying what your invention does and who would want it, and a note about whether you have filed anything with the patent office yet. If you do not have all three, call anyway - the first call will help you get them. One more thing that matters more than people think: when someone picks up, ask for help, or assistance, or a program. Do not ask for a grant or for money. The folks answering these phones open a lot more doors for a person asking for help.",
      "watchOut": "A company that wants money up front, before doing any work, is the number one pattern in invention scams. Yours may be perfectly honest - real engineering shops do take deposits. But federal law says an invention promotion company has to tell you in writing how many of its customers made more money than they paid it. Ask for that in writing before you part with a cent. And remember: no real government program ever charges you a fee to get money.",
      "firstCall": {
        "orgId": "idaho-sbdc",
        "why": "The Idaho SBDC is about ten minutes from you and it is free. Two things happen in one visit: an advisor reads the Pennsylvania company's offer with you and tells you honestly what they think of it, and they help Idaho inventors go after federal research money. Every other call on this sheet works better after you have talked to them.",
        "whatToSay": "Hello, my name is Thomas and I am an inventor here in Boise. I have designed something, and an engineering company in Pennsylvania has offered to do the development work on it. They are asking for a fee up front before they start, and I cannot cover it. I would like to make an appointment with an advisor who works with technology and new products. I need help understanding whether this offer is a fair one, and I would like to know what programs are out there that could help pay for the research work. When could someone sit down with me?"
      },
      "plan": [
        {
          "title": "Start here, and keep your money in your pocket",
          "body": "Call the Idaho SBDC at 208-426-3875 and ask for an appointment with an advisor who works with technology and new products. Take the Pennsylvania company's quote with you. Do not send that company a dollar until somebody neutral has read what you are being asked to sign. No deadline is worth skipping this, and anyone who tells you there is one has just told you something useful about themselves."
        },
        {
          "title": "Check the company before you pay",
          "body": "Call the patent office help line at 1-800-786-9199 in the same week. Ask them whether there are complaints on file about the Pennsylvania company. Ask what you should have in writing before you show anybody your drawings. While you have them, ask about the free patent attorney program. If your income is low enough, a real patent lawyer will work with you for nothing."
        },
        {
          "title": "Ask whether the work could be done in Idaho",
          "body": "Call Idaho Commerce at 208-334-2470 and ask whether an Idaho university lab could do this engineering work instead, through their IGEM program. Then get signed up with Elevate Idaho, the free statewide program that coaches Idaho inventors through federal research funding - your SBDC advisor can introduce you. If an Idaho lab can take on part of this job, you may never have to find that fee at all."
        },
        {
          "title": "Put in the free federal pitch",
          "body": "Go to seedfund.nsf.gov and write the three page Project Pitch. It is free, it is short, and they write back in about three weeks to say whether they want a full application. Have your SBDC advisor read it over first. You will need a registered business and a free SAM.gov account, and SAM.gov can take a few weeks, so start that part today. Check the current dates on the site before you write - the next full proposal deadlines are November 4, 2026 and March 4, 2027."
        },
        {
          "title": "If you still need cash for part of it",
          "body": "Kiva lends $1,000 to $15,000 with no interest, no fees and no credit check. It takes about two to three months, and first you have to get 10 to 25 of your own people to lend $25 each before the public ever sees your loan. Start writing that list of names today. And tick off each call on this sheet as you make it, with the name of whoever you spoke to. You will want those names when you call back."
        }
      ],
      "orgs": [
        {
          "id": "idaho-sbdc",
          "name": "Idaho SBDC - Southwest Idaho Center at Boise State University",
          "url": "https://idahosbdc.org",
          "phone": "208-426-3875",
          "address": "Micron Business & Economics Building, 2360 W University Dr, Suite 2132, Boise, ID 83706",
          "plainWhat": "Free business advisors, paid for by the government, sitting about ten minutes from your house. They work with Idaho inventors and they have people who handle technology and new products. They will sit down with you, read the offer from the Pennsylvania company, and tell you what they think of it. They also help with the paperwork for federal research money. You never pay them anything, ever.",
          "whoQualifies": "Any Idaho resident with a business or a business idea. You do not need a company set up yet. There is no income test and no limit on how many times you go back.",
          "area": "All of Idaho. This center covers Boise and the Treasure Valley. Other centers are listed at idahosbdc.org.",
          "whenToApply": "Any time. They book appointments year round. Expect a wait of a week or two, so call today.",
          "freeServices": "Free one-on-one advising, free help writing federal research applications, free market research on your invention",
          "moneyType": "Free advice only, but they open the doors to the money",
          "maxAmount": "No money - free help",
          "beforeYouCall": "Have the written quote or contract from the Pennsylvania company in front of you, even if it is only an email. The advisor cannot tell you whether it is a fair deal without seeing the actual numbers.",
          "script": "Hello, my name is Thomas and I am an inventor here in Boise. I have designed something, and an engineering company in Pennsylvania has offered to do the development work on it. They are asking for a fee up front before they start, and I cannot cover it. I would like to make an appointment with an advisor who works with technology and new products. I need help understanding whether this offer is a fair one, and I would like to know what programs are out there that could help pay for the research work. When could someone sit down with me?",
          "priority": 1
        },
        {
          "id": "uspto-inventors",
          "name": "U.S. Patent Office - Inventors Assistance Center and free patent attorney program",
          "url": "https://www.uspto.gov/probonopatents",
          "phone": "1-800-786-9199",
          "email": "usptoinfo@uspto.gov",
          "address": "No Idaho office - this one is done by phone. Start your free attorney match at uspto.gov/probonopatents",
          "plainWhat": "The government patent office runs a free help line for inventors. The people who answer it used to examine patents for a living. They answer your questions in plain English and they are not selling you anything. They also run a program that gets lower income inventors a real patent attorney for free, and they keep the public file of complaints about companies that take inventors' money and do nothing for it.",
          "whoQualifies": "Anyone can call the help line, no conditions at all. For the free patent attorney, your household income needs to be under four times the federal poverty line, and you need either a provisional patent application already on file or their short free training course finished.",
          "area": "Whole country",
          "whenToApply": "Any time. The help line is open on weekdays. The free attorney match takes a few weeks, so get the request in early.",
          "freeServices": "Free phone advice from former patent examiners, a free patent attorney if you qualify, free look at complaints filed against invention companies",
          "moneyType": "Free advice only",
          "maxAmount": "No money - free help, though a patent attorney would normally run you thousands of dollars",
          "beforeYouCall": "Write down the exact legal name of the Pennsylvania company and their street address. Ask whether any complaints have been filed against them, and whether they have given you the written notice the law requires from invention promotion companies. If they have not, that is worth knowing before you pay.",
          "script": "Hello, my name is Thomas and I am an inventor calling from Idaho. I have invented something, and a company in Pennsylvania wants a fee up front to do the engineering work on it. Before I pay anybody, I need assistance with two things. First, whether there are any complaints on file about this company. Second, what I should do to protect my idea before I hand over my drawings. I would also like information about the free patent attorney program, because I cannot afford a lawyer. Can you help me with that?",
          "priority": 1
        },
        {
          "id": "score-treasure-valley",
          "name": "SCORE - Free Mentors (Treasure Valley chapter, Boise)",
          "url": "https://www.score.org",
          "phone": "1-800-634-0245",
          "plainWhat": "Retired business owners and engineers who give you their time for free, for as long as you need them. Many of them have taken a product all the way from an idea to a shelf in a store. You can ask for a mentor who has done product work, and that person will read the Pennsylvania contract with you and tell you what they see in it.",
          "whoQualifies": "Anyone at all. No income test, no business required, no limit on how many times you meet, and it never costs anything.",
          "area": "Boise and the Treasure Valley. Find the local chapter at score.org, click Find a Mentor, and put in 83702. They also meet by phone and video.",
          "whenToApply": "Any time. You can ask for a mentor online today and usually hear back within a few days.",
          "freeServices": "Free mentoring for as long as you want it, free workshops, free help reading a contract or a quote before you sign it",
          "moneyType": "Free advice only",
          "maxAmount": "No money - free help",
          "beforeYouCall": "When you ask for a mentor, say in the box that you want someone with product design or engineering experience. If you leave that blank you may get a general business mentor, and what you need right now is someone who has actually made things.",
          "script": "Hello, my name is Thomas and I am in Boise. I have invented something, and I am looking for a mentor who has taken a product from an idea to something real. A company in Pennsylvania has offered to do my engineering work but they want money up front, and I would like someone experienced to look at that offer with me before I agree to anything. I would also like help thinking through what my next step ought to be. Can you match me with a mentor who has done product work?",
          "priority": 2
        },
        {
          "id": "elevate-idaho",
          "name": "Elevate Idaho - free coaching on federal research funding, run with Idaho State University",
          "url": "https://business.idaho.gov/assistance-resources/technology/",
          "phone": "No direct line is published. Start at the website above, or ask your Idaho SBDC advisor at 208-426-3875 to introduce you to Elevate Idaho.",
          "plainWhat": "A free statewide program that walks Idaho inventors through federal research funding, step by step. They run free classes online on the first Wednesday of each month, and a working session on the second Wednesday for people who already have an application going. It costs nothing, and there is no limit on how much help you get.",
          "whoQualifies": "Idaho inventors and small businesses going after federal research funding. You do not need a finished product, and you do not need to live near Pocatello.",
          "area": "All of Idaho. Most of it happens online, so being in Boise is no problem.",
          "whenToApply": "Any time. The free classes run every month, so you can join the next one.",
          "freeServices": "Free monthly classes, free one-on-one coaching on federal research applications, free introductions to other Idaho programs",
          "moneyType": "Free advice only",
          "maxAmount": "No money - free help",
          "beforeYouCall": "Have one page ready that says what your invention does, what problem it solves, and which part of it nobody has proved yet. That last part is the piece federal research money pays for, so it is the part they will ask about.",
          "script": "Hello, my name is Thomas and I am an inventor in Boise. I have designed something new, and an engineering company in another state has quoted me a fee I cannot pay. I would like some assistance figuring out whether a federal research program could pay for that development work instead. I understand you run free classes and coaching for Idaho inventors. How do I sign up, and could someone talk with me about my project?",
          "priority": 2
        },
        {
          "id": "nsf-seed-fund",
          "name": "America's Seed Fund - National Science Foundation (SBIR/STTR)",
          "url": "https://seedfund.nsf.gov",
          "phone": "703-292-5111 is the main National Science Foundation line. Most questions are handled through seedfund.nsf.gov and their free online office hours.",
          "plainWhat": "This is the National Science Foundation, and they give real money to small American companies to build new inventions. You do not give up any share of your company and you do not pay it back. The first step is small and free: a three page Project Pitch describing what you made. They read it and write back in about three weeks to tell you yes or no, before you ever have to write anything long.",
          "whoQualifies": "You need a for-profit business registered in the United States, mostly owned by U.S. citizens or permanent residents, with 500 or fewer workers. A brand new one-person company counts, and plenty of awards go to exactly that. The invention has to be risky in a technical way, meaning nobody is certain yet that it will work.",
          "area": "Whole country, Idaho included",
          "whenToApply": "Congress let this program lapse at the end of 2025 and renewed it in April 2026, so Project Pitches opened again on June 2, 2026. The next full proposal deadlines are November 4, 2026 and March 4, 2027. Always check seedfund.nsf.gov for today's dates before you spend time writing.",
          "freeServices": "Free Project Pitch review with written feedback, free webinars and online office hours where you can talk to a program director",
          "moneyType": "Grant - you keep your company and your invention",
          "maxAmount": "Up to $305,000 for the first phase. A second phase can be much larger, but that is years down the road.",
          "beforeYouCall": "Two things will stop you cold if you skip them. You need a registered business, and you need a free SAM.gov account, which can take several weeks to come through. And know this before you get your hopes up: in the first phase, at least two thirds of the work has to be done by your own company. So this money cannot simply pay the Pennsylvania firm's whole bill. Have the Idaho SBDC walk you through that piece.",
          "script": "Hello, my name is Thomas and I am an inventor in Boise, Idaho. I have designed a new product and I am trying to find out whether America's Seed Fund is a fit for it. I would like some assistance understanding the Project Pitch - what I need to have ready before I write it, and whether my kind of invention fits one of your topic areas. I also need to ask how much of the development work I am allowed to send to an engineering firm in another state. Who is the right program director for me to speak with?",
          "priority": 2
        },
        {
          "id": "idaho-commerce-igem",
          "name": "Idaho Department of Commerce - IGEM Program",
          "url": "https://commerce.idaho.gov",
          "phone": "208-334-2470",
          "address": "700 W State St, Boise, ID 83702",
          "plainWhat": "This is the state of Idaho's own program for getting Idaho inventions built. Here is the honest part, so you are not disappointed on the call: the money does not come to you as a check. It pays a research team at an Idaho university to do the technical work, with you as the business partner. If a lab at Boise State or the University of Idaho could do some of what the Pennsylvania company is charging you for, this is how it gets paid for.",
          "whoQualifies": "The application comes from an Idaho public university - Boise State, Idaho State or the University of Idaho - working with an Idaho business partner. You need the university partner lined up. Commerce or the SBDC can help you find one.",
          "area": "Idaho only. The research work has to happen in Idaho.",
          "whenToApply": "IGEM opens for proposals on a set schedule, usually once a year, and the university does the applying. Call and ask when the next round opens, and ask them to put you on the notice list so you do not miss it.",
          "freeServices": "Free guidance on how the program works, free introductions to university research teams, free honest answer on whether you fit",
          "moneyType": "Grant, paid to the university research team working with you",
          "maxAmount": "Varies by year. Past projects have run into the hundreds of thousands, paid to the lab rather than to you.",
          "beforeYouCall": "Understand before you dial that this money stays in Idaho and goes to a university. So ask them one question straight out: is there an Idaho university lab that could do some of this engineering work instead of the Pennsylvania company? That single question could save you the whole fee.",
          "script": "Hello, my name is Thomas and I am an inventor here in Boise. I am calling about the IGEM program. I have invented something that needs engineering and research work done on it, and I cannot pay for that work myself. I would like some assistance understanding how the program works and when the next round opens. I would also like to know whether someone can help me find a research team at an Idaho university who works in my area. Who should I be talking to about that?",
          "priority": 2
        },
        {
          "id": "boise-state-venture",
          "name": "Boise State Venture College and engineering senior design projects",
          "url": "https://www.boisestate.edu/venturecollege",
          "phone": "208-426-1000",
          "address": "Boise State University, 1910 University Dr, Boise, ID 83725 - ask for the Venture College",
          "plainWhat": "This is the university's program for people building new things. Their cash awards go to enrolled students, so that part probably is not for you, and I would rather tell you now than have you find out on the phone. But here is why you call anyway: Boise State engineering students have to finish a real design project for a real client every year, and they do it for free or close to it. Your invention could be one of those projects.",
          "whoQualifies": "The workshops and pitch events are open to anyone in the community. The cash awards are for Boise State students only. The senior engineering design projects do take outside clients, and that is the door worth knocking on.",
          "area": "Boise",
          "whenToApply": "Senior design teams get matched with their projects before each school year starts, so spring and early summer are the times to ask about the year ahead. Call now anyway and get your name on the list.",
          "freeServices": "Free workshops and pitch events open to the public, free mentoring, and a real shot at a student engineering team doing your design work",
          "moneyType": "Free advice only - the cash awards are for enrolled students",
          "maxAmount": "No money to you directly, but a student engineering design team is worth thousands",
          "beforeYouCall": "You are really asking two different offices two different questions, so be ready to be transferred. One question is for the Venture College, about their events and mentoring. The other is for the College of Engineering, about putting your invention forward as a senior design project.",
          "script": "Hello, my name is Thomas and I am an inventor here in Boise. I am trying to reach the Venture College, and I also have a question for the College of Engineering. I have invented something that needs engineering design work done on it, and an outside firm has quoted me a fee I cannot afford. I would like assistance finding out whether a senior design team could take my project on, and whether there are any programs at the university open to community inventors like me. Who should I speak with?",
          "priority": 3
        },
        {
          "id": "ben-franklin-pa",
          "name": "Ben Franklin Technology Partners (Pennsylvania)",
          "url": "https://benfranklin.org/connect/",
          "phone": "There is no single statewide line. Pick the office for your vendor's county at benfranklin.org/connect. The Southeastern Pennsylvania office, which covers the Philadelphia area, is 215-972-6700.",
          "plainWhat": "Pennsylvania has put state money into new technology companies for more than forty years, and this is the group that does it. Here is the honest part: they back Pennsylvania companies building their own products. They are not set up to pay your bill. But the firm doing your engineering is a Pennsylvania company, and it costs you nothing to ask whether there is anything on their side that could carry part of this work. It is a long shot. It is also a free phone call.",
          "whoQualifies": "The business they help has to be in Pennsylvania or setting up there. Your Pennsylvania engineering firm may already be known to them.",
          "area": "Pennsylvania. Four regional offices cover the state, and benfranklin.org/connect will point you to the right one.",
          "whenToApply": "Any time. They take questions year round.",
          "freeServices": "Free first conversation about whether a project fits, free introductions to Pennsylvania engineering and manufacturing resources",
          "moneyType": "Investment and loans to Pennsylvania companies, plus free advice to you",
          "maxAmount": "Varies by project and by region - ask them on the call",
          "beforeYouCall": "Have the Pennsylvania company's full legal name and the county they sit in. Ask whether that company is already known to them, and whether there is anything that would let the Pennsylvania side of this work be supported there instead of you having to find the fee. Do not be surprised if the answer is no - it is still worth twenty minutes.",
          "script": "Hello, my name is Thomas and I am an inventor calling from Idaho. I have an invention that an engineering company in Pennsylvania is willing to develop, so the technical work would be done in your state. They have asked me for a fee up front that I am not able to pay. I am calling for assistance understanding whether there is a Pennsylvania program that could support this work on their end instead. Could you tell me which of your regional offices covers their county, and who I should speak to there?",
          "priority": 3
        },
        {
          "id": "pa-dced",
          "name": "Pennsylvania Business One-Stop Shop (Dept. of Community and Economic Development)",
          "url": "https://business.pa.gov",
          "phone": "1-833-722-6778 (press 0 for a person)",
          "email": "business.dced@pa.gov",
          "plainWhat": "This is Pennsylvania's front desk for business questions in that state. You make one phone call and a real person walks you through the state programs a Pennsylvania business can use. They can also point you to the Industrial Resource Center for that county, which is the group that helps Pennsylvania shops take on new product work.",
          "whoQualifies": "Anyone can call and ask questions. The money itself goes to Pennsylvania businesses, which is why this call is worth making - your engineering work would be done there.",
          "area": "Pennsylvania",
          "whenToApply": "Any time. The line is open on weekdays.",
          "freeServices": "Free walkthrough of Pennsylvania business programs, free referral to the right regional office and Industrial Resource Center",
          "moneyType": "Grants and loans to Pennsylvania businesses; free guidance to you",
          "maxAmount": "Depends on the program - ask them to name the ones that fit this situation",
          "beforeYouCall": "Be ready to explain clearly that you are the inventor and the Pennsylvania company is the one doing the work. These programs help the Pennsylvania business, not you directly, so what you are really asking is whether anything on their side could carry part of the cost. Ask for the Industrial Resource Center for that county too.",
          "script": "Hello, my name is Thomas. I am an inventor in Idaho, and an engineering company in Pennsylvania is going to develop my product, so the work will be done in your state. They are asking me for money up front that I do not have. I am calling for assistance. I would like to know which Pennsylvania programs could help pay for that development work on their side. Could you also tell me how to reach the Industrial Resource Center for their area?",
          "priority": 3
        },
        {
          "id": "kiva-us",
          "name": "Kiva U.S. - 0% interest microloans",
          "url": "https://www.kiva.org/borrow",
          "phone": "No phone line - this one is done online at kiva.org/borrow. Questions go to support@kiva.org.",
          "email": "support@kiva.org",
          "plainWhat": "A loan with no interest and no fees of any kind. You borrow between one thousand and fifteen thousand dollars and you pay back exactly what you borrowed, not a dollar more. There is no credit check. The catch is that you have to ask friends and family to each lend you a small amount first, to show strangers you are worth backing.",
          "whoQualifies": "U.S. residents 18 and over. No minimum credit score. You cannot be in foreclosure or in bankruptcy. You do need a handful of people willing to lend you $25 each to get you started.",
          "area": "Whole country",
          "whenToApply": "Any time, but plan on about two to three months from starting to money in your hand. Do not count on this one if the Pennsylvania company is pushing you to pay next week.",
          "freeServices": "Free application, no fees ever, and free coaching from Kiva's local partners in some areas",
          "moneyType": "0% interest microloan",
          "maxAmount": "$1,000 to $15,000",
          "beforeYouCall": "Before you start the application, write down the names of 10 to 25 people who would lend you $25 - family, church, old coworkers, neighbors. Kiva will not put your loan in front of the public until some of your own people have backed it, and that is the step where most people get stuck.",
          "script": "There is no phone call for this one, so here is what to put in your Kiva story: My name is Thomas and I am an inventor in Boise, Idaho. I have designed something new, and I have found an engineering firm that can develop it, but I need help covering the cost of getting that work started. I am asking for a loan I can pay back over time at no interest, so I can get my invention built and start selling it. Every dollar would go straight into the engineering work.",
          "priority": 3
        }
      ],
      "called": [],
      "createdAt": "2026-06-28T14:20:00Z"
    }
  ],
  "tracker": {
    "heading": "My Applications",
    "intro": "This is where you keep track of everyone you've called and what happened after. Tick off what you've done, write yourself a note while it's fresh, and we'll remind you when it's time to check back.",
    "reassure": "Nothing here is late and nothing here is graded. One call is a good day.",
    "checklist": [
      {
        "key": "called",
        "label": "Called them"
      },
      {
        "key": "spoke",
        "label": "Wrote down who I spoke to"
      },
      {
        "key": "needs",
        "label": "Found out what they need from me"
      },
      {
        "key": "papers",
        "label": "Got my papers together"
      },
      {
        "key": "sent",
        "label": "Sent in my application"
      },
      {
        "key": "checked",
        "label": "Checked that they got it"
      },
      {
        "key": "answer",
        "label": "Heard back with an answer"
      }
    ],
    "nextActions": [
      {
        "status": "not-started",
        "nudge": "Just make the call. The words to say are on your call sheet — you can read them straight off it."
      },
      {
        "status": "called",
        "nudge": "Write down the name of the person you spoke to and what they asked you for, while you still remember it."
      },
      {
        "status": "applied",
        "nudge": "Ring back and ask one thing: how long until I hear from you? Then put that day in here."
      },
      {
        "status": "waiting",
        "nudge": "Quiet is normal. Give it a week, then call and say: I'm just checking where my application stands."
      },
      {
        "status": "got-help",
        "nudge": "Wonderful. Tell the community what worked — somebody else is about to make the same call."
      },
      {
        "status": "said-no",
        "nudge": "Before you close this one, ask them who else helps with this. Then go to the next name on your sheet."
      }
    ],
    "rows": [
      {
        "id": "app-flx-sbdc",
        "org": "Finger Lakes Small Business Development Center (SUNY Brockport)",
        "sheet": "Money and free help to start your business in Rochester",
        "phone": "(585) 395-8410",
        "status": "got-help",
        "done": [
          "called",
          "spoke",
          "needs",
          "papers",
          "answer"
        ],
        "note": "Went in Tuesday and met Denise on the 5th floor. She went through my numbers with me and never asked me for a penny. She's helping me put a loan package together and wants to see me again in two weeks.",
        "followUp": "2026-09-11",
        "sheetId": "aaron-rochester-ny-14604-business",
        "orgId": "flx-sbdc",
        "url": "https://www.sbdcbrockport.org/",
        "email": "sbdc@brockport.edu",
        "address": "161 Chestnut St, 5th Floor, Rochester, NY 14604 (main campus office at SUNY Brockport)",
        "script": "Hello, my name is Aaron Gavenda. I live here in Rochester and I'm getting ready to start a small business. I was told your advising is free, and I'd like to make an appointment with an advisor. I need help working out my start-up costs and finding out which programs I might qualify for. I'm right at the beginning, so I don't have much on paper yet. What would you like me to bring, and when is your earliest opening?"
      },
      {
        "id": "app-kiva-rochester",
        "org": "Kiva Rochester (City of Rochester)",
        "sheet": "Money and free help to start your business in Rochester",
        "phone": "(585) 428-6912",
        "status": "applied",
        "done": [
          "called",
          "spoke",
          "needs",
          "papers",
          "sent"
        ],
        "note": "Filled out the Kiva form with the city. Now I need people I know to lend a little bit first, before it goes out to strangers. Got three so far — my sister, Ray, and the fella at the barber shop. Need a few more.",
        "followUp": "2026-08-21",
        "sheetId": "aaron-rochester-ny-14604-business",
        "orgId": "kiva-rochester",
        "url": "https://www.cityofrochester.gov/departments/neighborhood-and-business-development/kiva-rochester-crowdfund-your-dream-change-your",
        "email": "",
        "address": "City of Rochester, Neighborhood & Business Development, 30 Church St, Rochester, NY 14614",
        "script": "Hi, my name is Aaron Gavenda and I live in Rochester. I'm starting a small business and I'd like some assistance with the Kiva Rochester program. I understand it's a no-interest loan and that somebody in your office helps people through the application. Could I speak with that person, or set up a time? I'd also like to know how long the whole thing usually takes from start to finish."
      },
      {
        "id": "app-nfcc",
        "org": "National Foundation for Credit Counseling (NFCC)",
        "sheet": "Leah, here's real help with your credit cards",
        "phone": "800-388-2227",
        "status": "called",
        "done": [
          "called",
          "spoke",
          "needs"
        ],
        "note": "Called and the woman was kind, never rushed me once. My appointment is Sept 2 at 10am. Before then I have to find the last statement for all four cards — balance, interest rate, smallest payment they'll take.",
        "followUp": "2026-09-02",
        "sheetId": "leah-91302-credit-card-debt",
        "orgId": "nfcc",
        "url": "https://www.nfcc.org",
        "email": "",
        "address": "No office visit needed. Counselors work by phone. To find a nonprofit agency near you, go to nfcc.org",
        "script": "Hi, my name is Leah. I live in Calabasas, California, and I have fallen behind on my credit cards. I would like to set up a free counseling session with a certified counselor. I want someone to look at everything with me and tell me honestly what my options are, including whether a debt management program would help me. Can you tell me what I need to have ready, and when someone can talk with me?"
      },
      {
        "id": "app-liheap-ca",
        "org": "LIHEAP Energy Bill Help - California Dept. of Community Services & Development",
        "sheet": "Leah, here's real help with your credit cards",
        "phone": "866-675-6623",
        "status": "said-no",
        "done": [
          "called",
          "spoke",
          "needs",
          "papers",
          "sent",
          "checked",
          "answer"
        ],
        "note": "This year's money is already gone. She said it was nothing I did wrong, the pot just runs out, and to call back when the new year opens on October 1. She also said if I ever get a shut-off notice, say that in the first sentence.",
        "followUp": "2026-10-01",
        "sheetId": "leah-91302-credit-card-debt",
        "orgId": "california-liheap",
        "url": "https://www.csd.ca.gov",
        "email": "",
        "address": "No single office. Call the number above and they will tell you which local agency covers ZIP code 91302, or apply online at caliheapapply.com",
        "script": "Hi, my name is Leah and I live in ZIP code 91302 in Los Angeles County. I would like to apply for the Low Income Home Energy Assistance Program to help with my gas and electric bill. Can you tell me which local agency covers my address, whether they are taking applications right now, and exactly what paperwork I need to bring in?"
      },
      {
        "id": "app-ok-snap",
        "org": "Oklahoma Human Services — SNAP Food Benefits",
        "sheet": "Getting food in Midwest City with no car",
        "phone": "405-522-5050",
        "status": "waiting",
        "done": [
          "called",
          "spoke",
          "needs",
          "papers",
          "sent",
          "checked"
        ],
        "note": "Applied online on the 3rd and they gave me a number. The interview call still hasn't come. They ring from a number I don't recognise so I've been answering everything.",
        "followUp": "2026-08-25",
        "sheetId": "rachel-midwest-city-food-no-car",
        "orgId": "okdhs-snap",
        "url": "https://www.okdhslive.org",
        "email": "",
        "address": "You do not need to go anywhere. Apply at okdhslive.org or by phone. If you would rather go in person, find your Oklahoma County office at oklahoma.gov/okdhs/contact-us.html",
        "script": "Hello, my name is Rachel. I just moved to Midwest City, Oklahoma, and I'd like some help applying for SNAP food benefits. I have very little money coming in right now and I don't have a car, so I'd like to do as much of this by phone as I can. Can you help me start my application today, and can you tell me if my case can be looked at quickly? And once I'm approved, could someone explain how I use the card to order groceries online for delivery?"
      },
      {
        "id": "app-mid-del-pantry",
        "org": "Mid-Del Food Pantry",
        "sheet": "Getting food in Midwest City with no car",
        "phone": "405-732-3603",
        "status": "got-help",
        "done": [
          "called",
          "spoke",
          "needs",
          "papers",
          "answer"
        ],
        "note": "Went Friday morning with my ID and the electric bill that has this address on it. Kind people, nobody made me explain myself. Came home with about four days of food. I can go back once 30 days are up.",
        "followUp": "2026-09-14",
        "sheetId": "rachel-midwest-city-food-no-car",
        "orgId": "mid-del-food-pantry",
        "url": "https://www.middelfoodpantry.com/",
        "email": "",
        "address": "322 N Midwest Blvd, Midwest City, OK 73110 — this one is right in your ZIP code",
        "script": "Hello, my name is Rachel and I live in Midwest City, ZIP 73110. I just moved here and I'm having trouble affording food. Could you tell me when you are open this week and what I need to bring with me? I don't have a car, so I also wanted to ask if you know of anyone close by who delivers food to people without transportation."
      },
      {
        "id": "app-hud-counselor",
        "org": "Free HUD-Approved Housing Counselor",
        "sheet": "Rent help for your daughter, and a way to get around",
        "phone": "1-800-569-4287",
        "status": "not-started",
        "done": [],
        "note": "Haven't rung yet. Note to self: say the words rental counseling, or they hand you to the mortgage side. And ask for a proper sit-down appointment, not a quick answer on the phone.",
        "followUp": "2026-09-01",
        "sheetId": "alma-houston-tx-rent-and-getting-around",
        "orgId": "hud-housing-counselor",
        "url": "https://www.consumerfinance.gov/find-a-housing-counselor/",
        "email": "",
        "address": "Free counseling offices all around Houston. The 800 number matches you to the closest one to her ZIP code, or you can search the map at the link above.",
        "script": "Hello, my name is Alma. I am looking for a housing counselor for my daughter. She rents an apartment here in Texas, she is a college student, and she is behind on her rent. Do you do rental counseling, and could we make an appointment? We would like someone to look at her situation, tell her what her rights are, and help us find any local assistance that is still open. Is there any cost to us?"
      },
      {
        "id": "app-bakerripley",
        "org": "BakerRipley (Harris County's largest community agency)",
        "sheet": "Rent help for your daughter, and a way to get around",
        "phone": "713-667-9400",
        "status": "waiting",
        "done": [
          "called",
          "spoke",
          "needs",
          "papers",
          "sent"
        ],
        "note": "Nothing is open this minute but she put my daughter on the list for the next round. I need the landlord's name and phone number ready because the money goes to him, not to us. She told me to check back myself rather than wait on them.",
        "followUp": "2026-08-26",
        "sheetId": "alma-houston-tx-rent-and-getting-around",
        "orgId": "bakerripley",
        "url": "https://www.bakerripley.org",
        "email": "",
        "address": "Main office at 4450 Harrisburg Blvd, Houston, TX 77011. They run service sites all over Harris County, listed at bakerripley.org/locations.",
        "script": "Hello, my name is Alma. I am calling about assistance with rent for my daughter. She is a college student living on her own here in Harris County, and she has fallen behind. Is there a rent assistance program open right now that she can apply to? If it is not open, could you tell me when it opens and how she gets on the list to be told? I have her landlord's information here if that helps."
      }
    ],
    "nudges": [
      "The day you picked for this one has come around. Nothing has been lost — it's still here, waiting for ten quiet minutes.",
      "A few follow-ups have gone past their date. Pick just one and make that call today. That's a good day's work.",
      "If this isn't the week for it, move the date. This list works around your life, not the other way round."
    ],
    "overdueLabel": "Time to check back",
    "upcomingLabel": "Coming up",
    "emptyState": {
      "title": "Nothing to follow up on yet",
      "body": "Open one of your call sheets and add the places you plan to ring. Then this page keeps score for you.",
      "cta": "Open a call sheet"
    }
  },
  "autoReply": {
    "name": "Tony Woodworth",
    "roleLabel": "Question Responder",
    "body": "Hi {name}, it's Tony! Thanks for asking — you are in exactly the right place.\n\nHere is what I would do first:\n\n1. Go to Build a call sheet and pick the topic that fits your question.\n2. Put in your ZIP code (or your city and state).\n3. In the last box, tell it what is going on in your own words — exactly the way you just told me.\n4. Press the button and give it a moment.\n\nYou will get back a list of places near you, with phone numbers and the words to say when they answer. Tick each one off as you call it.\n\nI will keep an eye on this conversation, so come straight back here if anything is unclear. You are doing the right thing by asking.",
    "attachments": [
      {
        "name": "How_To_Build_Your_Call_Sheet.pdf",
        "kind": "PDF",
        "size": "1 page"
      }
    ]
  }
};
