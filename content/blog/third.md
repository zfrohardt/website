+++
title = "Bitcoin's Blocksize and Blockweight"
date = 2021-06-03
+++

Bitcoin as a system is governed by rules enforced by the various participants in the network. Some of these rules are obvious, like not spending money you do not have, and some seem more arbitrary. Today, we will be talking about Bitcoin's blocksize. You may have heard that every block in Bitcoin is limited to up to one megabyte in size, and this is still sort of true. Bitcoin today uses a system called blockweight to measure and ultimately regulate the size of its blocks.

# History of the Blocksize
When Bitcoin was young, very few transactions were broadcast and confirmed on the network. There was no limit on the size of blocks, but blocks were small because Bitcoin was not being used. Satoshi worried that as blocks grew users would be disincentivized to run their own nodes and validate blocks themselves. If users are forced to trust a third party to validate transactions on the network, the Bitcoin project would fail to live up to its ideal of **Don't Trust, Verify**. Thus, a safeguard was added: no block on the network could be larger than one megabyte.

<aside>
The blocksize limit also had the added benefit of reducing the impact of bugs like the Quadratic Hashing bug, but that is beyond the scope of this article. Needless to say, the blocksize limit is deeply important to the decentralization efforts of Bitcoin for a wide variety of problems, both known and unknown.
</aside>

# On Soft Forks and Hard Forks
Once a consensus rule is introduced into Bitcoin, it becomes very hard to change. But Bitcoin has had a multitude of upgrades over its short history, so clearly it is not impossible. First, we should cover some important terms. There are two competing ways to upgrade Bitcoin: a soft or hard fork.

To explain the difference, lets imagine a football game. All of the fans can observe the game and confirm that both teams are playing by the rules, and will leave the stadium if someone begins to cheat. The NFL decides that they want to add new rules to the game, but do not want fans to leave. How do they do this? Well, a soft fork would be equivalent to changing the rules in a way that makes the game more restrictive, such that fans who do not know the new rules still see the game as honest. Imagine a new rule that only allows two-point conversions instead of extra point kicks. Fans who do not know the new rule may think it strange that their favorite team is no longer kicking extra points, but it is well within the rules for them to do so. So the fans stay at the game. This is an example of backwards compatibility. In this example, ignorant fans are equivalent to Bitcoin software that has not yet been upgraded. They still validate the important things like no stealing money, but may see behavior from other nodes as strange.

A hard fork by contrast makes the rules more permisive. Imagine our football game, but instead the new rule is that touchdowns are now worth ten points. Ignorant fans will see this as cheating, and leave the stadium hurting the NFL's revenue stream and reducing the number of people interested in football. A hard fork in Bitcoin can be (but is not necessarily) easier to program, but it requires all nodes on the network to upgrade. It can also be very dangerous, since a hard fork creates two Bitcoin networks that are competing over branding, money, and development time.

<aside>
There are cases where hard forking could be very useful and not particularly dangerous, like to fix the 2038 Unix time bug, but in general it is preferable to use soft forking when possible to keep the network operating in unison
</aside>

# How to Soft Fork Extra Space
So, now that we covered soft and hard forks, we get to the heart of the matter. The Bitcoin network will only permit blocks of one megabyte, so how can you add more space while preserving the old rules? In August 2017 an upgrade called SegWit was activated on the Bitcoin network that did just that.

<aside>
SegWit was a very comprehensive upgrade that I may go into further detail about in an upcoming post. For now, we will only be discussing the block size implications of SegWit.
</aside>

SegWit is an abbreviation for "Segregated Witness", which sounds more complicated than it actually is. When you create a Bitcoin transaction, you must attach a proof that proves you are authorized to spend the funds you are sending. Normally, this is a cryptographic signature, but it can also be the script for a smart contract or some other code that proves you are authorized. In cryptographic circles, this proof is called a witness. The network does not particularly care which witness you attach (there could be many), just that there is one. These witnesses are quite large: in fact, they are usually the majority of the size in a Bitcoin transaction. SegWit made the clever observation that witnesses are not necessary to update the state of the Bitcoin ledger, but are only needed to validate transactions.

The idea was to construct smaller transactions, such that under the rules of Bitcoin *anyone* could spend the money. This sounds dangerous! But SegWit added an additional rule that only SegWit aware nodes would enforce. It stipulated a second extension to Bitcoin's block where all of the signatures of these new formatted transactions would be held. To old nodes, this would seem strange, since there would be a lot of unprotected money flowing on the network. But to new nodes, the signatures would just be held in a second, larger area. This area would still be committed into the Bitcoin block, but would be hidden from the old network.

# Blockweight
Furthermore, size on the Bitcoin network is not everything. Some data must be kept until a user spends their money (like cryptographic keys and the amount of money associated with them). Some data is used to validate transactions once and then is never used again, like witnesses. So witnesses can be safely made larger without greatly affecting Bitcoin's decentralized goals since it can be pruned away when it is not needed. To incentivize witness use over standard UTXO data use, a discount was added to SegWit data, and this formula was created for calculating blockweight:

tx_size_with_witness_data_removed * 3 + tx_size_with_witness_data = blockweight

This seems a strange calculation, but it avoids an NP-complete bin packing problem for miners that would make it difficult to construct optimal blocks. It also gives a seemless transition between SegWit and Legacy Bitcoin transactions. If a transaction has no witness data, its blockweight is exactly four times greater than its size. If a transaction has SegWit data, it gets an appropriate discount. A Bitcoin block is now defined to be less than or equal to 4 million weight units. If there are no SegWit transactions in the block, that is equal to one megabyte, which is ok with the old rule. If there are some SegWit transactions, old nodes will actually see a block that is *smaller* than one megabyte, while upgraded nodes will know to check the extra SegWit information. In this way, Bitcoin upgraded in a backwards compatible way without splitting the network and while preserving its decentralized nature.

# SegWit and Future Upgrades
SegWit was a very large upgrade in terms of functionality. It fixed existing bugs, added more space to Bitcoin, lowered transaction fees, and gave a pathway to future upgrades. SegWit includes a variety of opcodes that are defined by current software to always evaluate to true and allow funds to be moved. This can be used by future upgrades to be built upon: where as today's nodes will see a transaction that allows funds to be moved unconditionably, future software can validate extra rules on top and add extensions and functionality to Bitcoin without splitting the network. In fact, an upgrade known as Taproot is currently being built right now using this functionality, and will probably be live in November of this year.

SegWit is entirely opt-in. Legacy transactions are still regularly broadcast and confirmed on the Bitcoin network everyday. Given the SegWit discount though, more and more people are upgrading their software and embracing the new features that SegWit adds.

# Conclusion
It is always important to remember the mission of Bitcoin: decentralized money, free from the control or interference of third parties. The phrase that I think sums it up best is **Rules without Rulers**. SegWit was a very contentious upgrade (for reasons beyond the scope of this article), but it holds true to Bitcoin's vision and showcases the creativity and ingenuity of the system.