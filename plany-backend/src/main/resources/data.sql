-- Councils
INSERT INTO councils (name, region, is_active) VALUES ('New Forest', 'South East', true);
INSERT INTO councils (name, region, is_active) VALUES ('Hart', 'South East', true);
INSERT INTO councils (name, region, is_active) VALUES ('Chichester', 'South East', true);
INSERT INTO councils (name, region, is_active) VALUES ('Camden', 'London', true);

-- Listings
INSERT INTO listings (council_id, reference_number, status, address, description, decision_date) 
VALUES (1, '26/10058', 'Granted', 'MARL COTTAGE, MARL LANE, FORDINGBRIDGE SP6 1JR', '2no. outbuildings for use as garden office and gym', '2026-03-05');

INSERT INTO listings (council_id, reference_number, status, address, description, decision_date) 
VALUES (2, '25/02582/HOU', 'Pending', '34 Cove Road Fleet Hampshire GU51 2RN', 'Erection of a detached outbuilding', '2026-03-04');

INSERT INTO listings (council_id, reference_number, status, address, description, decision_date) 
VALUES (3, '26/00100/LBC', 'Refused', 'Herons Farm Village Road Kirdford Billingshurst', 'Replacement and relocation of existing swimming pool.', '2026-03-06');

INSERT INTO listings (council_id, reference_number, status, address, description, decision_date) 
VALUES (4, '26/01293/FUL', 'Withdrawn', '12 Bloomsbury Square, London, WC1A 2LP', 'Change of use from office to residential.', '2026-03-01');
