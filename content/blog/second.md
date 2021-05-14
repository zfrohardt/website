+++
title = "An Overview of Bitcoin Scaling"
date = 2021-05-14
+++

There is much talk this week of Bitcoin's scaling properties, especially after the news that Tesla has stopped taking orders for new Teslas because of Elon Musk's concern regarding Bitcoin's energy use and scaling properties. There is a lot of confusion surrounding Bitcoin's scaling properties, specifically because Bitcoin is a new technology that does not have a direct anologue to the technologies that most consumers are exposed to. This leads to questions like, **"Why is Bitcoin limited to so few transactions per second? If Bitcoin is just code, why can't we add more room in the blocks for more transactions? Why would we want to limit this brand new technology?"** This confusion has regretablly led to the rise of many different altcoins that prey on people's preconception of what Bitcoin should do do, without learning why Bitcoin makes the tradeoffs that it does.

<!-- more -->

# So, What are the Problems in the First Place?
As a reminder, Bitcoin orders transactions into packages called blocks that are assembled by miners. These blocks are produced in a probablistic fashion such that a new block of transactions is created about every ten minutes. This introduces our first problem. Assume that Bitcoin has become a global currency used all over the world. If you want to use Bitcoin to buy coffee, do you really want to wait **ten minutes** before you can leave the coffee shop? Your coffee would grow cold before you could even take your first sip! Even worse is that since blocks are produced probablistically, if the network is unlucky, a new block could take an hour to be created! This does not seem like a good system for a global currency.

The second problem is that each block is limited in size. When a miner creates a new block, it must conform to a specifc set of rules, otherwise it will be rejected by the network. Some of these rules are obvious (do not steal money from someone), and others are more technical. One of the more technical rules is that a block can only be so big, and thus is limited in the number of transactions it can contain.

<aside>
NOTE: The technical term for block size in Bitcoin is block weight and it is measured in weight units. A block is allowed to be at most 4 million weight units. The precise method of this calculation is interesting, and the history and implementation of this calculation will be the subject of a future blog post.
</aside>
<br/>
If too many people are trying to send Bitcoin transactions, then some people will have to wait for another block. Since miners prioritize transaction inclusion based on transaction fees, this means that when the network gets busy, fees go up. This has driven fees for a single Bitcoin transaction up as high as $20 in some cases. Imagine again you are trying to buy coffee with Bitcoin. Would you buy a coffee for $4 at Starbucks only to add $20 in fees? Again, this does not seem like a good currency system.

# These Seem like Invented Problems. Why is Bitcoin so Limited?
When disecting Bitcoin, it is important to understand what it is desgined for. Bitcoin is supposed to be a peer to peer protocol that avoids trusted authorities. The cannonical example of this ethos is the so called 21 Million Rule: there is a maximum amount of Bitcoin that will ever be in circulation. There are only two ways to validate this rule. You can trust whoever issues the currency that they will not cheat, lie, or break the rules regardless of what you think (think of this as the Federal Reserve model), or you can track all the currency that exists in the world and count it up yourself. The latter is what Bitcoin uses, because it is the only way to be able to validate the axiom of 21 Million by yourself.

This is however a pretty onerous task. Keeping track of every transaction in the world is a tall order. Is the entrepreneur in Tokyo supposed to care about my purchase of coffee in Seattle? The answer is (sort of) yes! If there was the possiblity that I could lie and tell some people I paid Starbucks, but other people thought I still had money in my wallet, I would inflate the money supply by **double spending**, which is the problem Bitcoin is trying to solve! The only way to ensure that our Japanese entrepreneur can keep track of the system is to limit the system so any computer can keep up with the activity on the network.

You can think of this as limits on the transaction throughput of Bitcoin. It is limited precisely so it can be kept democratized. Any system that encourages centralization or economies of scale will centralize over time. Then, we are back to trusting third parties to manage our currency, and Bitcoin's goal will have been doomed.

# So, is Bitcoin doomed to be limited?
Luckily, no! Bitcoin is designed to be a *settlement layer* for larger transactions. You can think of this like a bar tab: when you go to pay for drinks at a bar, you give the bartender your credit card and order some drinks. After you have had a few, you then settle up the entire amount with the bartender. You make one transaction on your credit card, but that transaction could represent a dozen individual purchases from the bar. 

There is actually precedence for this in the current financial system. The system known as FedWire handles interbank transactions in precisely the same way. When banks negotiate payments between people (like in a credit card network), member banks will batch transactions together to avoid unecessary overhead and costs. The only way to scale a large system is in layers. Bitcoin works the exact same way. At least, it will in the future.

# The Future?
When Bitcoin first started, there was very little activity on the network. Miners rarely if ever had trouble processing every transaction that had been broadcast onto the network. Now, the Bitcon network is worth $1 Trillion, and there is much more activity, to the point where it is rare that a block is not full! What are Bitcoin users to do? The primary answer is a system called the Lightning Network.

The Lightning Network has been in active operation for a few years now, and has seen massive growth in both adoption and in deployed infrastructure. It works like the bar tab example from above, but on a much grander scale. Users deposit bitcoin into channels between peers, and can update those channels without ever touching the Bitcoin network. The system is designed much like Bitcoin in that you never have to trust a third party. Lightning solves both of the problems we have discussed so far, without weakening Bitcoin's security guarantees, or comprimising on its values of putting the users first and democratising access.

# How?
Imagine our Starbucks example from eariler. Instead of paying Starbucks on chain everytime you want to buy coffee, you could instead deposit a month's worth of coffee money into a channel with Starbucks. Then, everytime you want to pay for your morning coffee, you just push some of the money you deposited into this channel over to Starbucks. The barista could update the state of the channel every morning, proving to the world that you paid, but the barista knows that you come in every morning, and so she doesn't broadcast the update. Only when both you and Starbucks want to close the channel do you broadcast the update and make another Bitcoin transaction. In this way, we can compress dozens of coffee transactions down into one transaction. We solve the waiting problem because updating the channel only requires the knowledge of the payer and payee, and we solve the transaction throughput problem because we can compress many transactions down into one.

<aside>
NOTE: This is a gross oversimplification of how Lightning works. A future blog post will cover the network in more detail.
</aside>
<br/>

The Lightning Network is even more clever than this though. Lets say that I have my channel with Starbucks, but I also want to pay for my groceries with Bitcoin. And my dry cleaning. And my mortgage. And my gas. Do we have to have a channel for everything?

What if Starbucks has a channel with my bank? I could tell Starbucks to pay for my mortgage, and I will pay Starbucks an equal amount (plus a small routing fee). Starbucks would make a little money, and I could repurpose my channel with Starbucks to pay anyone that Starbucks has a channel with. Or, with a litte imagination, we can see that we can pay anyone through a larger network of channels, over perhaps many hops. I pay Starbucks, Starbucks pays my bank, and my bank pays the local restaurant that I am dining at. Again, we solve the waiting problem (each channel can update instantly) and we solve the transaction throughput problem (many transactions can be made over these channels.) Even better, I now can pay anyone on the Lightning Network with only a few channels! If I wanted to, I could even route transactions for other people and make a little money on the side. These channels allow me to both send and receive money, and are designed to last for weeks, months, or years, depending on who you are connected to and how you want to manage your money.

# What's the Catch?
Lightning relies heavily on Bitcoin to support its security guarantees, but ulimately it trades off the flexibility and security of Bitcoin for cost and convenience. While it is trustless, Lightning currently requires you to be online to receive money, where Bitcoin does not. The software is also not as battle tested as Bitcoin is, and adoption is limited compared to Bitcoin. Despite these tradeoffs, I believe that Lightning is the future of Bitcoin software. Companies like Strike already use Lightning to enable payments in any currency of your choosing all around the world. Places like Bitcoin Beach use Lightning to power the first Bitcoin circular economy. Lightning works, today, and its growth is rapid. Software is getting more reliable, and improvements to the network will allow even cheaper transactions and safer security guarantees.

# Is Lightning the Only Way Bitcoin will Scale?
Lightning is just one example of what is being termed a *Layer 2* Bitcoin technology. Much like how the Internet has many layers, Bitcoin will scale by enabling technologies to be built on top of itself like Lightning. There are a few others being worked on including sidechains, the most notable of which is called Liquid. There are other proposals, but only Lightning and Liquid have production ready code today. I do not doubt that additional Layer 2 and eventually event Layer 3 technologies will build on the foundation that Bitcoin built.

# Conclusion
Bitcoin may seem limited, but by changing our frame of reference, we can see that it is built as a foundation for more advanced technologies. Bitcoin is designed to be democratized money, not beholden to a government or corporation that can be corrupted. If the goal is free and sound money, Bitcoin provides a solution with scaling tradeoffs. Only by building on top of a strong foundation, without comprimising the soul of Bitcoin, can we scale the network to a truly global currency.