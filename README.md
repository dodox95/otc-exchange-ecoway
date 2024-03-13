1. stworzcie plik '.env' obok '.env.example' i wbijcie tam to co wam wyslalem na grupie oraz napiszcie: 'yarn install' zmiencie w packages.json tylko na '  "packageManager": "yarn@1.22.21",
'
2. jesli chcecie zmienic seedy w wallecie podmiencie "PRIVATE_KEY=<YOUR PRIVATE KEY>" np PRIVATE_KEY=chujkurwaxdddd
3. smart contract jest gotowy, ale jesli chcecie wygenerowac nowy musicie najpierw usunac w src/types oraz src/artifacts usuncie cale te dwa foldery i gdy to usuniecie wpiszcie w terminalu: 'npx hardhat compile' i wtedy pojawia Wam sie na nowo src/types oraz src/artifacts.
4. Gdy Wam to sie pojawia src/types oraz src/artifacts to czas na deploy contractu wchodzicie w terminal i wpisujecie: npx hardhat run --network sepolia scripts/deploy_otcmarket.ts, tam wam pokaze sa sie kontrakty itd.
   np:
 
ITManToken deployed to: 0xEff3024c38eDf6fE0FF43329039b55cdc29Cf1FE   <--- address wygenerowanego tokena
Name ITManToken
Symbol ITM
Decimals 18
Total Supply 1000000000000000000000000
Owner 0xE409E3a77952dBB9d5810B0Fedaa68BaF29F7494
OTCMarket deployed to: 0xE1B5fF107a59F208391d4823E30193D01E4F1354   <--- adres smart contractu OTC.

5. uruchom apke 'yarn dev'
