Dear Concerned, 

I’ve completed performance test on frequently used API for test App. 
Test executed for the below mentioned scenario in http://159.89.38.11/login

05 Concurrent Request with 01 Loop Count; Avg TPS for Total Samples is ~ 7 And Total Concurrent API requested: 505.
08 Concurrent Request with 01 Loop Count; Avg TPS for Total Samples is ~ 8 And Total Concurrent API requested: 808.
09 Concurrent Request with 01 Loop Count; Avg TPS for Total Samples is ~ 10 And Total Concurrent API requested: 909.
10 Concurrent Request with 01 Loop Count; Avg TPS for Total Samples is ~ 11 And Total Concurrent API requested: 1010.
15 Concurrent Request with 01 Loop Count; Avg TPS for Total Samples is ~ 13 And Total Concurrent API requested: 1515.
20 Concurrent Request with 01 Loop Count; Avg TPS for Total Samples is ~ 14.4 And Total Concurrent API requested: 1847.
24 Concurrent Request with 01 Loop Count; Avg TPS for Total Samples is ~ 24 And Total Concurrent API requested: 2424.
25 Concurrent Request with 01 Loop Count; Avg TPS for Total Samples is ~ 18 And Total Concurrent API requested: 2121.

While executed 25 concurrent request, found  8476 request got connection timeout and error rate is 1.37%. 

Summary: Server can handle almost concurrent 9 API call with almost zero (0) error rate.

Please find the details report from the attachment and  let me know if you have any further queries. 
