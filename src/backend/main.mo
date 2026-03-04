import List "mo:core/List";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Map "mo:core/Map";

actor {
  type Enquiry = {
    name : Text;
    phoneNumber : Text;
    email : Text;
    message : Text;
  };

  module Enquiry {
    public func from(enquiry : Enquiry) : Enquiry {
      {
        name = enquiry.name;
        phoneNumber = enquiry.phoneNumber;
        email = enquiry.email;
        message = enquiry.message;
      };
    };
  };

  let contacts = Map.empty<Principal, Enquiry>();

  public shared ({ caller }) func submitEnquiry(enquiry : Enquiry) : async () {
    if (contacts.containsKey(caller)) {
      Runtime.trap("Enquiry already exists");
    };
    contacts.add(caller, Enquiry.from(enquiry));
  };

  public query ({ caller }) func getEnquiry() : async Enquiry {
    switch (contacts.get(caller)) {
      case (null) { Runtime.trap("Enquiry not found") };
      case (?enquiry) { enquiry };
    };
  };

  public query ({ caller }) func getAllEnquiries() : async [Enquiry] {
    contacts.values().toArray();
  };
};
