curl --user 111 --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "decoderawtransaction", "params": ["01000000017358de53a2b86b6bc77643cffafa583c9bbc6ae0fd501b0bef67dbd2a778cd45070000006b48304502210093dedd4837a8fa0065305847d786d6c2ac41c360ed105cc629d7d177810bbbe702204439a4c904fda27a4e64066ecdc01a8ec62a60d7ac12d10ae90a5e7cb328c8e1012103e812c43da27fee0f8bf3aa09db468d387218929ed71c7324b01e7707d637626efeffffff0ed3141c00000000001976a9147f13f277246c5a189742a0ab0fd8f0cba5d4999488acd3df0800000000001976a9146eba577cfcfa435d1c95046bf06479d1c63b28db88acf7960e00000000001976a914a4db49d3915d5385e426d721fb5d65166161a99888ace1b80600000000001976a91488c193a36ac8faa7085721250dc66c1c6b030ca988ac69a10c00000000001976a91460159b1b31dc8dff23bd41b32ba0c427df9acecf88ac9d1e8000000000001976a91418d484fbb61574cda39d21b3dadc4ee99b93a30688ac00c2eb0b000000001976a914fa89fd66bbeab30f1283c4d1273b2d40919567fe88acca051f00000000001976a91404269fa77608987f6002fbfcfe32b79d6005fe6988acdb401a00000000001976a9145c13389855f1a10b9729e0aa5c74b81abe84bb6f88ac2aad0800000000001976a914950e5a79b044c133fd25bb5e125a47c6e5b9381188ac6816c509000000001976a914388d10cde7b094e1dfc2f95adef461676282073c88ac386a0200000000001976a91429bdc7a9c5f62f9e7507e16d4fae4d64e403062388ac88eff300000000001976a9141b83925da1807e2fe1bb1a54d36743c7430a602088ac40420f00000000001976a9146a326a6e47a1b4d4f1b6407368662601cc7b890a88acc38f0700"] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/ | jq '.' |cat > x.output