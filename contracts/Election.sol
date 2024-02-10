// SPDX-License-Identifier: MIT
pragma solidity >=0.4.18 <0.9.0;

contract Election {
    address public admin;
    uint256 candidateCount;
    uint256 voterCount;
    bool start;
    bool end;

    constructor() public {
        admin = msg.sender;
        candidateCount = 0;
        voterCount = 0;
        start = false;
        end = false;
    }

    function getAdmin() public view returns (address) {
        return admin;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    // Modeling a candidate
    struct Candidate {
        uint256 candidateId;
        string header;
        string slogan;
        uint256 voteCount;
    }
    mapping(uint256 => Candidate) public candidateDetails;

    // Adding new candidates
    function addCandidate(
        string memory _header,
        string memory _slogan
    )
        public
        // Only admin can add
        onlyAdmin
    {
        Candidate memory newCandidate = Candidate({
            candidateId: candidateCount,
            header: _header,
            slogan: _slogan,
            voteCount: 0
        });
        candidateDetails[candidateCount] = newCandidate;
        candidateCount += 1;
    }

    // Modeling a Election Details
    struct ElectionDetails {
        string adminName;
        string adminEmail;
        string adminTitle;
        string electionTitle;
        string organizationTitle;
    }
    ElectionDetails electionDetails;

    function setElectionDetails(
        string memory _adminName,
        string memory _adminEmail,
        string memory _adminTitle,
        string memory _electionTitle,
        string memory _organizationTitle
    )
        public
        // Only admin can add
        onlyAdmin
    {
        electionDetails = ElectionDetails(
            _adminName,
            _adminEmail,
            _adminTitle,
            _electionTitle,
            _organizationTitle
        );
        start = true;
        end = false;
    }

    // Get Elections details
    function getAdminName() public view returns (string memory) {
        return electionDetails.adminName;
    }

    function getAdminEmail() public view returns (string memory) {
        return electionDetails.adminEmail;
    }

    function getAdminTitle() public view returns (string memory) {
        return electionDetails.adminTitle;
    }

    function getElectionTitle() public view returns (string memory) {
        return electionDetails.electionTitle;
    }

    function getOrganizationTitle() public view returns (string memory) {
        return electionDetails.organizationTitle;
    }

    function getTotalCandidate() public view returns (uint256) {
        return candidateCount;
    }

    function getTotalVoter() public view returns (uint256) {
        return voterCount;
    }

    // Modeling a voter
    struct Voter {
        address voterAddress;
        string name;
        string phone;
        bool isVerified;
        bool hasVoted;
        bool isRegistered;
        bool faceVerified;
        string imageUrl; // Add the imageUrl field to store the face image URL
        string email;
    }
    address[] public voters; // Array of address to store address of voters
    mapping(address => Voter) public voterDetails;

    function registerAsVoter(
        string memory _name,
        string memory _phone,
        string memory _imageUrl, // Include the imageUrl parameter in the function
        string memory _email
    ) public {
        Voter memory newVoter = Voter({
            voterAddress: msg.sender,
            name: _name,
            phone: _phone,
            hasVoted: false,
            isVerified: false,
            isRegistered: true,
            faceVerified: false,
            imageUrl: _imageUrl, // Store the imageUrl in the voter struct
            email: _email
        });
        voterDetails[msg.sender] = newVoter;
        voters.push(msg.sender);
        voterCount += 1;
    }

    function verifyVoter(
        bool _verifedStatus,
        address voterAddress
    )
        public
        // Only admin can verify
        onlyAdmin
    {
        voterDetails[voterAddress].isVerified = _verifedStatus;
    }

    function vote(uint256 candidateId) public {
        require(voterDetails[msg.sender].hasVoted == false);
        require(voterDetails[msg.sender].isVerified == true);
        require(start == true);
        require(end == false);
        candidateDetails[candidateId].voteCount += 1;
        voterDetails[msg.sender].hasVoted = true;
    }

    function faceVerify(address voterAddress) public {
        require(voterDetails[voterAddress].hasVoted == false);
        require(voterDetails[voterAddress].isVerified == true);
        require(start == true);
        require(end == false);
        voterDetails[voterAddress].faceVerified = true;
    }

    function endElection() public onlyAdmin {
        end = true;
        start = false;
    }

    function getStart() public view returns (bool) {
        return start;
    }

    function getEnd() public view returns (bool) {
        return end;
    }
}
