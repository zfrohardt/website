+++
title = "An Overview of Bitcoin Scaling"
date = 2021-05-14
+++

There is much talk this week of Bitcoin's scaling properties, especially after the news that Tesla has stopped taking orders for new Teslas because of Elon Musk's concern regarding Bitcoin's energy use and scaling properties. There is a lot of confusion surrounding Bitcoin's scaling properties, specifically because Bitcoin is a new technology that does not have a direct anologue to the technologies that most consumers are exposed to. This leads to questions like, //"Why is Bitcoin limited to so few transactions per second? If Bitcoin is just code, why can't we add more room in the blocks for more transactions? Why would we want to limit this brand new technology?"// This confusion has regretablly led to the rise of many different altcoins that prey on people's preconception of what Bitcoin should do do, without learning why Bitcoin makes the tradeoffs that it does.

# So, What is the Problem in the First Place?
As a reminder, Bitcoin orders transactions into packages called blocks that are assembled by miners. These blocks are produced in a probablistic fashion such that a new block of transactions is created about every ten minutes. This introduces our first problem. We can call it the *Coffee Problem*.